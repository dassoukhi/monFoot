import { createRedisInstance } from "@/lib/redis";
import { API_CONFIG } from "@/constants/api";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const redis = createRedisInstance();

/**
 * API Route optimisée pour les scores live
 * Cache très court (2min) pour limiter les appels API
 * Accepte une liste d'IDs de matchs à rafraîchir
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fixtureIds } = req.body as { fixtureIds: number[] };

    if (!fixtureIds || !Array.isArray(fixtureIds) || fixtureIds.length === 0) {
      return res.status(400).json({ error: "fixtureIds array required" });
    }

    // Limiter à 10 matchs max pour éviter trop d'appels API
    const idsToFetch = fixtureIds.slice(0, 10);

    // Vérifier le cache pour chaque match
    const results: any[] = [];
    const idsToRefresh: number[] = [];

    for (const id of idsToFetch) {
      const cacheKey = `live:${id}`;
      const cached = await redis?.get(cacheKey);

      if (cached) {
        results.push(JSON.parse(cached));
      } else {
        idsToRefresh.push(id);
      }
    }

    // Si tous les matchs sont en cache, retourner directement
    if (idsToRefresh.length === 0) {
      if (process.env.NODE_ENV === "development") {
        console.log(`✅ ${results.length} matchs live depuis le cache`);
      }
      return res.status(200).json(results);
    }

    // Sinon, fetch uniquement les matchs manquants
    if (process.env.NODE_ENV === "development") {
      console.log(`📡 Fetch ${idsToRefresh.length} matchs live depuis l'API`);
    }

    const apiResults = await Promise.all(
      idsToRefresh.map(async (id) => {
        try {
          const response = await axios({
            method: "get",
            url: `${process.env.API_FOOTBALL_URL || "https://api-football-v1.p.rapidapi.com/v3"}/fixtures?id=${id}`,
            headers: {
              "X-RapidAPI-Key": process.env.API_FOOTBALL_KEY || "",
              "X-RapidAPI-Host": API_CONFIG.RAPID_API_HOST,
            },
            timeout: API_CONFIG.TIMEOUT,
          });

          const match = response?.data?.response?.[0];

          if (match) {
            // Cache court pour les matchs live (2 minutes)
            const cacheKey = `live:${id}`;
            await redis?.set(cacheKey, JSON.stringify(match), "PX", 120000);

            return match;
          }

          return null;
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error(`Erreur fetch match ${id}:`, error);
          }
          return null;
        }
      })
    );

    // Combiner résultats du cache et de l'API
    const allResults = [
      ...results,
      ...apiResults.filter((r) => r !== null),
    ];

    return res.status(200).json(allResults);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error in POST /api/live-scores:", error);
    }
    return res.status(500).json({ error: "Failed to fetch live scores" });
  }
}

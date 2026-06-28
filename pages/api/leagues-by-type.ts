import { createRedisInstance } from "@/lib/redis";
import { MAX_AGE_TODAY } from "@/utils/expireRedis";
import { leagues } from "@/utils/leagues";
import { API_CONFIG, API_ENDPOINTS } from "@/constants/api";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const redis = createRedisInstance();

/**
 * API Route pour récupérer les matchs par type
 * Query params: type = today | upcoming | live
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { type = "today" } = req.query as { type?: "today" | "upcoming" | "live" };

    const cacheKey = `leagues:${type}`;

    // Vérifier le cache
    try {
      const cached = await redis?.get(cacheKey);
      if (cached) {
        if (process.env.NODE_ENV === "development") {
          console.log(`✅ Leagues ${type} depuis le cache`);
        }
        return res.status(200).json(JSON.parse(cached));
      }
    } catch (cacheError) {
      if (process.env.NODE_ENV === "development") {
        console.warn("⚠️ Erreur lecture cache Redis:", cacheError);
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`📡 Chargement leagues type: ${type}`);
    }

    // Configuration selon le type
    const getConfig = (leagueId: string) => {
      let url = "";
      const currentYear = new Date().getFullYear();

      if (type === "today") {
        const today = new Date().toISOString().split("T")[0];
        // IMPORTANT: ajouter &season= pour que l'API retourne les matchs du jour
        url = `https://${API_CONFIG.RAPID_API_HOST}/v3/fixtures?league=${leagueId}&season=${currentYear}&date=${today}`;
      } else if (type === "upcoming") {
        url = `https://${API_CONFIG.RAPID_API_HOST}/v3/fixtures?league=${leagueId}&next=${API_CONFIG.MAX_MATCHES}`;
      } else if (type === "live") {
        url = `https://${API_CONFIG.RAPID_API_HOST}/v3/fixtures?league=${leagueId}&live=all`;
      }

      return {
        method: "get" as const,
        maxBodyLength: Infinity,
        url,
        headers: {
          "X-RapidAPI-Key": process.env.API_FOOTBALL_KEY || "",
          "X-RapidAPI-Host": API_CONFIG.RAPID_API_HOST,
        },
        timeout: API_CONFIG.TIMEOUT,
      };
    };

    // Charger les données
    const results = await Promise.all(
      leagues.map(async (league) => {
        try {
          const res = await axios(getConfig(league.id));

          if (res?.data?.response?.length) {
            // Trier les matchs selon le type
            let sortedMatches = res?.data?.response;

            if (type === "today") {
              // Pour today: tri DESC (plus récent en premier)
              sortedMatches = sortedMatches.sort((a: any, b: any) => {
                return Date.parse(b.fixture.date) - Date.parse(a.fixture.date);
              });
            } else {
              // Pour upcoming/live: tri ASC (plus proche en premier)
              sortedMatches = sortedMatches.sort((a: any, b: any) => {
                return Date.parse(a.fixture.date) - Date.parse(b.fixture.date);
              });
            }

            return [
              {
                league: res.data.response?.[0]?.league,
                matchs: sortedMatches,
              },
            ];
          }
          return null;
        } catch (apiError) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`⚠️ Erreur API pour ${league.name}:`, apiError);
          }
          return null;
        }
      })
    );

    // Filtrer et trier
    const filteredResults = results.filter((r): r is LeagueWithMatches[] => r !== null);

    // Tri selon le type
    const sorted = filteredResults.sort((a, b) => {
      const dateA = Date.parse(a?.[0]?.matchs?.[0]?.fixture?.date);
      const dateB = Date.parse(b?.[0]?.matchs?.[0]?.fixture?.date);

      // Pour "today": tri DESC (plus récent en premier)
      // Pour "upcoming" et "live": tri ASC (plus proche en premier)
      if (type === "today") {
        return dateB - dateA; // Inverser le tri
      } else {
        return dateA - dateB; // Tri normal
      }
    });

    // Sauvegarder dans le cache
    try {
      // Cache plus court pour live (1min), moyen pour today (5min), long pour upcoming (30min)
      const cacheTime = type === "live" ? 60000 : type === "today" ? MAX_AGE_TODAY : 1800000;
      await redis?.set(cacheKey, JSON.stringify(sorted), "PX", cacheTime);
      if (process.env.NODE_ENV === "development") {
        console.log(`✅ Leagues ${type} mises en cache (${cacheTime / 1000}s)`);
      }
    } catch (cacheError) {
      if (process.env.NODE_ENV === "development") {
        console.warn("⚠️ Erreur sauvegarde cache Redis:", cacheError);
      }
    }

    return res.status(200).json(sorted);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Erreur dans /api/leagues-by-type:", error);
    }
    return res.status(500).json({ error: "Failed to fetch leagues" });
  }
}

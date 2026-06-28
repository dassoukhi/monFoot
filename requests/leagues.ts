import { createRedisInstance } from "@/lib/redis";
import { MAX_AGE_TODAY } from "@/utils/expireRedis";
import { leagues } from "@/utils/leagues";
import { API_CONFIG, API_ENDPOINTS, CACHE_KEYS } from "@/constants/api";
import axios from "axios";
import moment from "moment";
moment.locale("fr");

const redis = createRedisInstance();

const config = (idLeague: string, useToday: boolean = true) => {
  return {
    method: "get" as const,
    maxBodyLength: Infinity,
    url: useToday
      ? API_ENDPOINTS.FIXTURES_TODAY(idLeague)
      : API_ENDPOINTS.FIXTURES_NEXT(idLeague, API_CONFIG.MAX_MATCHES),
    headers: {
      "X-RapidAPI-Key": process.env.API_FOOTBALL_KEY || "",
      "X-RapidAPI-Host": API_CONFIG.RAPID_API_HOST,
    },
    timeout: API_CONFIG.TIMEOUT,
  };
};
const getLeagues = async (): Promise<LeaguesResponse> => {
  try {
    const key = CACHE_KEYS.LEAGUES;

    // Essayer de récupérer depuis le cache
    try {
      const cached = await redis?.get(key);
      if (cached) {
        if (process.env.NODE_ENV === "development") {
          console.log("✅ Données chargées depuis le cache Redis");
        }
        const sortedArray = JSON.parse(cached);
        return sortedArray;
      }
    } catch (cacheError) {
      if (process.env.NODE_ENV === "development") {
        console.warn("⚠️ Erreur lecture cache Redis:", cacheError);
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.log("📡 Chargement des données depuis l'API...");
    }

    // Charger les données depuis l'API avec timeout
    const results = await Promise.all(
      leagues.map(async (league) => {
        try {
          // Charger UNIQUEMENT les matchs d'aujourd'hui (pas de fallback)
          const res = await axios(config(league.id, true));

          if (res?.data?.response?.length) {
            return [
              {
                league: res.data.response?.[0]?.league,
                matchs: res?.data?.response,
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

    // Filtrer les résultats null et trier
    const filteredResults = results.filter((r): r is LeagueWithMatches[] => r !== null);
    const sorted = filteredResults.sort((a, b) => {
      return (
        Date.parse(a?.[0]?.matchs?.[0]?.fixture?.date) -
        Date.parse(b?.[0]?.matchs?.[0]?.fixture?.date)
      );
    });

    // Sauvegarder dans le cache (5min pour voir les changements live)
    try {
      await redis?.set(key, JSON.stringify(sorted), "PX", MAX_AGE_TODAY);
      if (process.env.NODE_ENV === "development") {
        console.log("✅ Données mises en cache (5min)");
      }
    } catch (cacheError) {
      if (process.env.NODE_ENV === "development") {
        console.warn("⚠️ Erreur sauvegarde cache Redis:", cacheError);
      }
    }

    return sorted;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Erreur critique dans getLeagues:", error);
    }
    // Retourner un tableau vide au lieu de undefined
    return [];
  }
};

export default getLeagues;

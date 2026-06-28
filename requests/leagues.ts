import { createRedisInstance } from "@/lib/redis";
import { MAX_AGE } from "@/utils/expireRedis";
import { leagues } from "@/utils/leagues";
import axios from "axios";
import moment from "moment";
moment.locale("fr");

const redis = createRedisInstance();
// milliseconds
const config = (idLeague: string) => {
  const year = moment().year();
  return {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${idLeague}&next=10`,
    headers: {
      "X-RapidAPI-Key": process.env.API_FOOTBALL_KEY || "",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };
};
const getLeagues = async () => {
  try {
    const key = "leaguesDataKey";

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
          const res = await axios({
            ...config(league.id),
            timeout: 8000, // 8 secondes timeout
          });
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
    const filteredResults = results.filter((r) => r !== null);
    const sorted = filteredResults.sort((a: any, b: any) => {
      return (
        Date.parse(a?.[0]?.matchs?.[0]?.fixture?.date) -
        Date.parse(b?.[0]?.matchs?.[0]?.fixture?.date)
      );
    });

    // Sauvegarder dans le cache (ne pas bloquer si ça échoue)
    try {
      await redis?.set(key, JSON.stringify(sorted), "PX", MAX_AGE);
      if (process.env.NODE_ENV === "development") {
        console.log("✅ Données mises en cache");
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

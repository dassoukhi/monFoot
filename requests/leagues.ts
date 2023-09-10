import { createRedisInstance } from "@/lib/redis";
import { leagues } from "@/utils/leagues";
import axios from "axios";
import moment from "moment";

const redis = createRedisInstance();
const MAX_AGE = 60_000 * 60 * 24; // 1 hour
const EXPIRY_MS = `PX`; // milliseconds
const config = (idLeague: string) => {
  const year = moment().year();
  return {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${idLeague}&season=${year}&next=10`,
    headers: {
      "X-RapidAPI-Key": "7b3e6cad43msh7f76e0ea302ba91p1f7947jsn714bd238e070",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };
};
const getLeagues = async () => {
  try {
    const key = "leaguesDataKey";
    const cached = await redis.get(key);
    if (cached) {
      return JSON.parse(cached);
    }
    const results = await Promise.all(
      leagues.map(async (league) => {
        const res = await axios(config(league.id));
        if (res?.data?.response?.length) {
          return [
            {
              league: res.data.response?.[0]?.league,
              matchs: res?.data?.response,
            },
          ];
        }
      })
    );
    await redis.set(key, JSON.stringify(results), EXPIRY_MS, MAX_AGE);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export default getLeagues;

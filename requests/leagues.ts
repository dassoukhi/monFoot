import { createRedisInstance } from "@/lib/redis";
import { MAX_AGE } from "@/utils/expireRedis";
import { leagues } from "@/utils/leagues";
import axios from "axios";
import moment from "moment";

const redis = createRedisInstance();
// milliseconds
const config = (idLeague: string) => {
  const year = moment().year();
  return {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${idLeague}&next=10`,
    headers: {
      "X-RapidAPI-Key": "7b3e6cad43msh7f76e0ea302ba91p1f7947jsn714bd238e070",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };
};
const getLeagues = async () => {
  try {
    const key = "leaguesDataKey";
    const cached = await redis?.get(key);
    if (cached) {
      console.log("from cache: ");

      const sortedArray = JSON.parse(cached);
      return sortedArray;
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
    const sorted = results.sort((a: any, b: any) => {
      return (
        Date.parse(a?.[0]?.matchs?.[0]?.fixture?.date) -
        Date.parse(b?.[0]?.matchs?.[0]?.fixture?.date)
      );
    });
    await redis?.set(key, JSON.stringify(sorted), "PX", MAX_AGE);
    return sorted;
  } catch (error) {
    console.log(error);
  }
};

export default getLeagues;

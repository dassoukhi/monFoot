"use server";
import { createRedisInstance } from "@/lib/redis";
import getLeagues from "./leagues";
import { User } from "next-auth";
import { prisma } from "@/lib/instancePrisma";

const redis = createRedisInstance();
const MAX_AGE = 60_000 * 60 * 24; // 1 hour
const EXPIRY_MS = `PX`; // milliseconds
const existTeam = (
  teams: { id: number; name: string; logo: string }[],
  id: number
) => {
  const find = teams?.find((team) => team?.id === id);
  return !!find;
};
const isFavori = (
  team: { id: number | string; name: string; logo: string },
  iDs: string[]
) => {
  if (iDs && iDs.length) {
    return iDs?.includes(team.id.toString());
  }
  return false;
};
const getAllTeams = async (user?: User) => {
  let favoritesIds = [] as string[];
  if (user) {
    favoritesIds = (await prisma?.user
      ?.findUnique({
        where: { email: user.email as string },
      })
      .then((favoris) => favoris?.favoriteTeams)) as string[];
  }
  const key = "teamsDataKey";
  const cached = await redis.get(key);
  if (cached) {
    const data = JSON.parse(cached);
    if (user) {
      const teams = data.map((team: Team) => {
        if (isFavori(team, favoritesIds)) {
          const temp = { ...team, checked: true };
          return { ...team, checked: true };
        } else {
          return team;
        }
      });
      return teams;
    }
    return data;
  }

  const teams = [] as { id: number; name: string; logo: string }[];
  const results = await getLeagues();
  if (results && results?.length) {
    results.map((result: any[]) => {
      if (result && result?.length) {
        const current = result?.[0]?.matchs;
        current?.map((team: any) => {
          if (!existTeam(teams, team?.teams?.away?.id)) {
            if (isFavori(team?.teams?.away, favoritesIds)) {
              teams?.push({ ...team?.teams?.away, checked: true });
            } else {
              teams?.push({ ...team?.teams?.away });
            }
          }
          if (!existTeam(teams, team?.teams?.home?.id)) {
            if (isFavori(team?.teams?.away, favoritesIds)) {
              teams?.push({ ...team?.teams?.home, checked: true });
            } else {
              teams?.push({ ...team?.teams?.home });
            }
          }

          return;
        });
      }
      return;
    });
  }
  await redis.set(key, JSON.stringify(teams), EXPIRY_MS, MAX_AGE);
  return teams;
};

export default getAllTeams;

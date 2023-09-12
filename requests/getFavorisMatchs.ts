import { prisma } from "@/lib/instancePrisma";
import { User } from "next-auth";
import getLeagues from "./leagues";

const getFavorisMatch = async (user: User) => {
  if (!user) {
    return null;
  }
  const favoritesIds = await prisma?.user
    ?.findUnique({
      where: { email: user.email as string },
    })
    .then((favoris) => favoris?.favoriteTeams);

  const allLeagues = await getLeagues();

  const data = allLeagues?.map((league: any) => {
    let temps;
    const matchs = league?.[0]?.matchs?.filter((element: any) => {
      if (
        favoritesIds?.includes(element?.teams?.home?.id?.toString()) ||
        favoritesIds?.includes(element?.teams?.away?.id?.toString())
      ) {
        return element;
      }
    });
    if (matchs?.length) {
      temps = { ...league?.[0], matchs: matchs };
    }
    if (temps) {
      return temps;
    }
  });

  return data;
};

export default getFavorisMatch;

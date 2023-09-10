import { prisma } from "@/lib/instancePrisma";
import { User } from "next-auth";
import getAllTeams from "./teams";

const getFavoris = async (user: User) => {
  if (!user) {
    return null;
  }
  const favoritesIds = await prisma?.user
    ?.findUnique({
      where: { email: user.email as string },
    })
    .then((favoris) => favoris?.favoriteTeams);

  const allTeams = await getAllTeams();

  const data = allTeams?.filter((team: { id: string }) =>
    favoritesIds?.includes(team?.id?.toString())
  );
  const favorisTeams = data?.map((team: Team) => {
    return { id: team?.id, name: team.name, logo: team.logo, checked: true };
  });
  return favorisTeams;
};

export default getFavoris;

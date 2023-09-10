import { prisma } from "@/lib/instancePrisma";
import { User } from "next-auth";

const Removefavoris = async (id: string, user: User) => {
  if (user && user?.email) {
    const userUpdate = await prisma.user.findUnique({
      where: { email: user.email },
    });
    if (userUpdate) {
      console.log("userUpdate", userUpdate);
      if (userUpdate?.favoriteTeams.includes(id.toString())) {
        const filterFav = userUpdate.favoriteTeams.filter(
          (idSave) => idSave.toString() !== id.toString()
        );
        userUpdate.favoriteTeams = filterFav;
        await prisma.user.update({
          data: { favoriteTeams: userUpdate?.favoriteTeams },
          where: { email: userUpdate.email as string },
        });
      }
      return userUpdate;
    }
  }
  return null;
};
export default Removefavoris;

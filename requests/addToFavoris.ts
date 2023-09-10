import { prisma } from "@/lib/instancePrisma";
import { User } from "next-auth";

const addTofavoris = async (id: string, user: User) => {
  if (user && user?.email) {
    const userUpdate = await prisma.user.findUnique({
      where: { email: user.email },
    });
    if (userUpdate) {
      console.log("userUpdate", userUpdate);
      if (!userUpdate?.favoriteTeams.includes(id.toString())) {
        userUpdate.favoriteTeams.push(id.toString());
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
export default addTofavoris;

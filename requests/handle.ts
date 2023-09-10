"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User, getServerSession } from "next-auth";
import getAllTeams from "./teams";

const handle = async () => {
  const session = await getServerSession(authOptions);
  const data = await getAllTeams(session?.user as User);
  return data;
};

export default handle;

import React from "react";
import getAllTeams from "@/requests/teams";
import EquipeCard from "@/components/EquipeCard";
import { User, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function Search() {
  const session = await getServerSession(authOptions);
  const data = await getAllTeams(session?.user as User);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <EquipeCard teams={data} />
      <div className="h-14 w-ful"></div>
    </main>
  );
}

export default Search;

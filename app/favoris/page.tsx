import FavorisCard from "@/components/FavorisCard";
import { User, getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getFavoris from "@/requests/getFavoris";

async function Favoris() {
  const session = await getServerSession(authOptions);
  const favorites = await getFavoris(session?.user as User);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <FavorisCard teams={favorites} />
    </main>
  );
}

export default Favoris;

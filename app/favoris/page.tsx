import FavorisCard from "@/components/FavorisCard";
import { User, getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/nextauth";
import getFavorisMatch from "@/requests/getFavorisMatchs";

async function Favoris() {
  const session = await getServerSession(authOptions);
  const favorites = await getFavorisMatch(session?.user as User);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 md:px-64">
      <div className="h-16"></div>
      <FavorisCard favorites={favorites} />
    </main>
  );
}

export default Favoris;

import FavorisCard from "@/components/FavorisCard";
import { User, getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/nextauth";
import getFavorisMatch from "@/requests/getFavorisMatchs";
import League from "@/components/League";
import { Key } from "swr";

async function Favoris() {
  const session = await getServerSession(authOptions);
  const favorites = await getFavorisMatch(session?.user as User);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <div className="p-2 w-full flex flex-col gap-4">
        {favorites?.map(
          (
            item: JSX.IntrinsicAttributes & {
              league: {
                id: number;
                name: string;
                country: string;
                logo: string;
                flag: string;
                season: number;
                round: string;
              };
              matchs: any[];
            },
            index: number
          ) => {
            if (item) {
              return <League key={index} {...item} />;
            }
          }
        )}
        <div className="h-12"></div>
      </div>
    </main>
  );
}

export default Favoris;

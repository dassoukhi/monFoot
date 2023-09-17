"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Team from "./Team";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Button from "./Button";
import LoaderCercle from "./LoaderCercle";
import League from "./League";

type props = {
  favorites: any[];
};
function FavorisCard({ favorites }: props) {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    router.refresh();
  }, [router]);
  console.log(favorites?.length);

  if (session?.status === "loading") {
    return <LoaderCercle />;
  }
  if (favorites?.length) {
    return (
      <div className="p-2 w-full items-center flex flex-col gap-4 md:w-2/3 md:px-8">
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
    );
  }
  return (
    <div className="flex h-[78vh] flex-col items-center justify-between p-2 overflow-y-scroll">
      {session?.status == "unauthenticated" ? (
        <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4">
          <p className="text-sm text-gray-600 text-center">
            {"Connectez-vous pour voir le match  de vos èquipes favorites"}
          </p>
          <Button
            text={"Se connecter"}
            className="p-[6px] bg-gray-700 text-gray-100 rounded-xl text-sm"
            onClick={() => signIn()}
          />
        </div>
      ) : (
        <div className="bg-slate-50 flex-1 h-1/2 py-4 px-8 flex flex-col gap-4 rounded-xl shadow-md w-full">
          {!favorites && (
            <div className="h-4/6 flex justify-center items-center flex-col gap-5">
              <p className="text-gray-500 text-sm">
                {"Vous n'avez pas d'équipe(s) favorite(s)"}
              </p>
              <Button
                text="Ajoutez une équipe"
                onClick={() => router.push("/equipes")}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FavorisCard;

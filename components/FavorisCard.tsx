"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Team from "./Team";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Button from "./Button";
import LoaderCercle from "./LoaderCercle";

type props = {
  teams: Team[];
};
function FavorisCard({ teams }: props) {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    router.refresh();
  }, [router]);

  if (session?.status === "loading") {
    return <LoaderCercle />;
  }
  return (
    <div className="flex h-[78vh] flex-col items-center justify-between p-2 overflow-y-scroll">
      {session?.status == "unauthenticated" ? (
        <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4">
          <p className="text-sm text-gray-600">
            {"Connectez-vous pour voir vos èquipes favoris"}
          </p>
          <Button
            text={"Se connecter"}
            className="p-[6px] bg-gray-700 text-gray-100 rounded-xl text-sm"
            onClick={() => signIn()}
          />
        </div>
      ) : (
        <div className="bg-slate-50 flex-1 h-1/2 py-4 px-8 flex flex-col gap-4 rounded-xl shadow-md w-full">
          <div className="w-full ">
            <p className="text-gray-500">Favoris</p>
          </div>
          {teams?.length ? (
            teams?.map((item) => <Team key={item?.id} team={item} />)
          ) : (
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

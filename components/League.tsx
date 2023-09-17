"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Match from "./Match";
import { useRouter } from "next/navigation";

type props = {
  league: league;
  matchs: EventCaming[];
};
function League({ league, matchs }: props) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <div
      className="bg-slate-50 flex-1 p-2 flex flex-col gap-4 rounded-xl shadow-md pb-8 w-full"
      id={`${league?.id.toString()}`}
    >
      {/* header */}
      <div className="flex items-center gap-2">
        <Image
          loader={() => league?.logo}
          src={league?.logo}
          width={64}
          height={64}
          alt={league?.name}
          className="h-8 w-8"
        />
        <p className="text-md text-gray-800">{league?.name}</p>
      </div>
      {/* matchs */}
      {matchs?.map((item) => (
        <Match key={item.fixture?.id} {...item} />
      ))}
    </div>
  );
}

export default League;

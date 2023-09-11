"use client";
import Image from "next/image";
import React from "react";
import Match from "./Match";

type props = {
  league: league;
  matchs: EventCaming[];
};
function League({ league, matchs }: props) {
  return (
    <div className="bg-slate-50 flex-1 p-2 flex flex-col gap-4 rounded-xl shadow-md pb-8">
      {/* header */}
      <div className="flex items-center gap-2">
        <Image
          loader={() => league?.logo}
          src={league?.logo}
          width={24}
          height={24}
          alt={league?.name}
          className="h-auto w-auto"
        />
        <p className="text-md text-gray-800">{league?.name}</p>
      </div>
      {/* matchs */}
      {matchs?.map((item) => (
        <Match key={league.id} {...item} />
      ))}
    </div>
  );
}

export default League;

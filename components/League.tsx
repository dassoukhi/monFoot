"use client";
import Image from "next/image";
import React from "react";
import Match from "./Match";
import DebugMatchStatus from "./DebugMatchStatus";

type props = {
  league: league;
  matchs: EventCaming[];
};
function League({ league, matchs }: props) {
  return (
    <div
      className="bg-slate-50 dark:bg-gray-800 flex-1 p-2 flex flex-col gap-4 rounded-xl shadow-md pb-8 w-full"
      id={`${league?.id.toString()}`}
    >
      {/* Debug component (dev only) */}
      <DebugMatchStatus matchs={matchs} />

      {/* header */}
      <div className="flex items-center gap-2">
        <Image
          src={league?.logo}
          width={64}
          height={64}
          alt={`${league?.name} logo`}
          className="h-8 w-8"
          unoptimized
        />
        <p className="text-md text-gray-800 dark:text-gray-200">{league?.name}</p>
      </div>
      {/* matchs */}
      {matchs?.map((item) => (
        <Match key={item.fixture?.id} {...item} />
      ))}
    </div>
  );
}

export default League;

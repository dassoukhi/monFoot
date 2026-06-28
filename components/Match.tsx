import Image from "next/image";
import React from "react";
import { formatMatchDate, formatMatchTime } from "@/utils/dateFormat";
import { isMatchLive, isMatchFinished, getStatusLabel } from "@/utils/matchStatus";

function Match({ fixture, teams, goals, score }: EventCaming) {
  const matchStatus = fixture?.status?.short || "NS";
  const isLive = matchStatus ? isMatchLive(matchStatus) : false;
  const isFinished = matchStatus ? isMatchFinished(matchStatus) : false;

  // Scores (priorité: goals > score > null)
  const homeScore = goals?.home ?? score?.fulltime?.home ?? null;
  const awayScore = goals?.away ?? score?.fulltime?.away ?? null;
  const hasScore = homeScore !== null && awayScore !== null;

  // Debug en dev uniquement
  if (process.env.NODE_ENV === "development" && (isLive || isFinished || hasScore)) {
    console.log(`🎯 Match ${teams?.home?.name} vs ${teams?.away?.name}:`, {
      status: matchStatus,
      isLive,
      isFinished,
      hasScore,
      goals,
      score,
    });
  }

  return (
    <div className="bg-blue-50 dark:bg-gray-700 rounded-r-lg flex flex-col pb-2 pt-1 items-center shadow-md relative">
      {/* Badge LIVE */}
      {isLive && (
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          LIVE
        </div>
      )}

      <div className="flex flex-col items-center">
        {isLive ? (
          <p className="text-xs font-semibold text-red-600 dark:text-red-400">
            {getStatusLabel(matchStatus)}
          </p>
        ) : isFinished ? (
          <p className="text-xs font-semibold text-green-600 dark:text-green-400">
            {getStatusLabel(matchStatus)}
          </p>
        ) : (
          <>
            <p className="text-xs text-gray-500 dark:text-gray-400">{formatMatchDate(fixture?.date)}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{formatMatchTime(fixture?.date)}</p>
          </>
        )}
      </div>
      <div className="flex w-full px-4 items-center ">
        <div className="flex-1 flex items-center justify-center  gap-4">
          <div className=" flex flex-col justify-center items-center gap-1">
            <Image
              src={teams?.home?.logo}
              alt={`${teams?.home?.name} logo`}
              width={64}
              height={64}
              className="h-16 w-16"
              unoptimized
            />
            <p className="text-xs text-gray-800 dark:text-gray-200 w-[100px] whitespace-nowrap overflow-hidden text-ellipsis text-center ">
              {teams?.home?.name}
            </p>
          </div>
          {/* Score équipe domicile */}
          {hasScore && (
            <span className={`text-3xl font-bold ${
              isLive ? "text-red-600 dark:text-red-400" :
              isFinished ? "text-green-600 dark:text-green-400" :
              "text-gray-800 dark:text-gray-200"
            }`}>
              {homeScore}
            </span>
          )}
        </div>
        <div className="p-4 flex">
          <span className={`text-lg ${
            hasScore ? "text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-200"
          }`}>
            {hasScore ? ":" : "-"}
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center  gap-4">
          {/* Score équipe extérieure */}
          {hasScore && (
            <span className={`text-3xl font-bold ${
              isLive ? "text-red-600 dark:text-red-400" :
              isFinished ? "text-green-600 dark:text-green-400" :
              "text-gray-800 dark:text-gray-200"
            }`}>
              {awayScore}
            </span>
          )}
          <div className=" flex flex-col justify-center items-center gap-1">
            <Image
              src={teams?.away?.logo}
              alt={`${teams?.away?.name} logo`}
              width={64}
              height={64}
              className="h-16 w-16"
              unoptimized
            />
            <p className="text-xs text-gray-800 dark:text-gray-200 w-[100px] whitespace-nowrap overflow-hidden text-ellipsis text-center ">
              {teams?.away?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Match;

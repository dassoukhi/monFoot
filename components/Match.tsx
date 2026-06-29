import Image from "next/image";
import React from "react";
import { formatMatchDate, formatMatchTime } from "@/utils/dateFormat";
import { isMatchLive, isMatchFinished, getStatusLabel } from "@/utils/matchStatus";

function Match({ fixture, teams, goals, score, events }: EventCaming) {
  const matchStatus = fixture?.status?.short || "NS";
  const isLive = matchStatus ? isMatchLive(matchStatus) : false;
  const isFinished = matchStatus ? isMatchFinished(matchStatus) : false;

  // Scores (priorité: goals > score > null)
  const homeScore = goals?.home ?? score?.fulltime?.home ?? null;
  const awayScore = goals?.away ?? score?.fulltime?.away ?? null;
  const hasScore = homeScore !== null && awayScore !== null;

  // Filtrer les buts (exclure own goals qui comptent pour l'équipe adverse)
  const goalEvents = events?.filter((event) => event.type === "Goal" && event.detail !== "Own Goal") || [];

  // Séparer les buteurs par équipe
  const homeGoals = goalEvents.filter((event) => event.team.id === teams.home.id);
  const awayGoals = goalEvents.filter((event) => event.team.id === teams.away.id);

  return (
    <div className="bg-blue-50 dark:bg-gray-700 rounded-r-lg flex flex-col pb-2 pt-2 items-center shadow-md relative">
      {/* Badge LIVE */}
      {isLive && (
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          LIVE
        </div>
      )}

      <div className="flex flex-col items-center mb-2">
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
      <div className="flex w-full px-4 items-start justify-center gap-3 md:gap-4">
        {/* Équipe domicile */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <div className="h-12 w-12 md:h-16 md:w-16 relative flex items-center justify-center">
            <Image
              src={teams?.home?.logo}
              alt={`${teams?.home?.name} logo`}
              width={64}
              height={64}
              className="max-h-full max-w-full object-contain"
              unoptimized
            />
          </div>
          <p className="text-xs text-gray-800 dark:text-gray-200 w-[100px] whitespace-nowrap overflow-hidden text-ellipsis text-center">
            {teams?.home?.name}
          </p>
        </div>

        {/* Scores centraux */}
        <div className="flex items-center gap-2 md:gap-3 pt-2">
          {hasScore && (
            <span className={`text-xl md:text-2xl font-bold ${
              isLive ? "text-red-600 dark:text-red-400" :
              isFinished ? "text-green-600 dark:text-green-400" :
              "text-gray-800 dark:text-gray-200"
            }`}>
              {homeScore}
            </span>
          )}
          <span className={`text-base md:text-lg ${
            hasScore ? "text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-200"
          }`}>
            {hasScore ? ":" : "-"}
          </span>
          {hasScore && (
            <span className={`text-xl md:text-2xl font-bold ${
              isLive ? "text-red-600 dark:text-red-400" :
              isFinished ? "text-green-600 dark:text-green-400" :
              "text-gray-800 dark:text-gray-200"
            }`}>
              {awayScore}
            </span>
          )}
        </div>

        {/* Équipe extérieure */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <div className="h-12 w-12 md:h-16 md:w-16 relative flex items-center justify-center">
            <Image
              src={teams?.away?.logo}
              alt={`${teams?.away?.name} logo`}
              width={64}
              height={64}
              className="max-h-full max-w-full object-contain"
              unoptimized
            />
          </div>
          <p className="text-xs text-gray-800 dark:text-gray-200 w-[100px] whitespace-nowrap overflow-hidden text-ellipsis text-center">
            {teams?.away?.name}
          </p>
        </div>
      </div>

      {/* Buteurs */}
      {hasScore && goalEvents.length > 0 && (
        <div className="w-full px-4 mt-2 flex flex-col gap-1">
          {/* Fusionner tous les buteurs et les afficher par ligne */}
          {(() => {
            const maxGoals = Math.max(homeGoals.length, awayGoals.length);
            return Array.from({ length: maxGoals }).map((_, index) => (
              <div key={index} className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                {/* Buteur équipe domicile */}
                <div className="flex items-center gap-1 flex-1">
                  {homeGoals[index] ? (
                    <>
                      <span>⚽</span>
                      <span className="font-medium">{homeGoals[index].player.name}</span>
                      <span className="text-gray-400 dark:text-gray-500">{homeGoals[index].time.elapsed}&apos;</span>
                    </>
                  ) : (
                    <span className="invisible">placeholder</span>
                  )}
                </div>
                {/* Buteur équipe extérieure */}
                <div className="flex items-center justify-end gap-1 flex-1">
                  {awayGoals[index] ? (
                    <>
                      <span className="text-gray-400 dark:text-gray-500">{awayGoals[index].time.elapsed}&apos;</span>
                      <span className="font-medium">{awayGoals[index].player.name}</span>
                      <span>⚽</span>
                    </>
                  ) : (
                    <span className="invisible">placeholder</span>
                  )}
                </div>
              </div>
            ));
          })()}
        </div>
      )}
    </div>
  );
}

export default Match;

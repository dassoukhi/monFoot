"use client";

import React from "react";

/**
 * Composant de debug pour afficher les statuts des matchs
 * À supprimer après vérification
 */
function DebugMatchStatus({ matchs }: { matchs: EventCaming[] }) {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const liveMatches = matchs.filter((m) => {
    const status = m?.fixture?.status?.short;
    return ["1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"].includes(status);
  });

  const finishedMatches = matchs.filter((m) => {
    const status = m?.fixture?.status?.short;
    return ["FT", "AET", "PEN"].includes(status);
  });

  const upcomingMatches = matchs.filter((m) => {
    const status = m?.fixture?.status?.short;
    return ["TBD", "NS"].includes(status);
  });

  return (
    <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg my-2 text-xs">
      <h3 className="font-bold mb-2">🐛 Debug Statuts Matchs</h3>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <p className="font-semibold text-red-600">LIVE: {liveMatches.length}</p>
          {liveMatches.slice(0, 2).map((m) => (
            <div key={m.fixture.id} className="text-xs">
              {m.teams.home.name} vs {m.teams.away.name}
              <br />
              Status: {m.fixture.status.short}
              <br />
              Score: {m.goals?.home ?? "?"}-{m.goals?.away ?? "?"}
            </div>
          ))}
        </div>
        <div>
          <p className="font-semibold text-green-600">Terminés: {finishedMatches.length}</p>
          {finishedMatches.slice(0, 2).map((m) => (
            <div key={m.fixture.id} className="text-xs">
              {m.teams.home.name} vs {m.teams.away.name}
              <br />
              Status: {m.fixture.status.short}
              <br />
              Score: {m.goals?.home ?? m.score?.fulltime?.home ?? "?"}-
              {m.goals?.away ?? m.score?.fulltime?.away ?? "?"}
            </div>
          ))}
        </div>
        <div>
          <p className="font-semibold text-gray-600">À venir: {upcomingMatches.length}</p>
          {upcomingMatches.slice(0, 2).map((m) => (
            <div key={m.fixture.id} className="text-xs">
              {m.teams.home.name} vs {m.teams.away.name}
              <br />
              Status: {m.fixture.status.short}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DebugMatchStatus;

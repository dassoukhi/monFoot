import Match from "@/components/Match";
import React from "react";

/**
 * Page de test pour voir les différents statuts de matchs
 * URL: http://localhost:3000/test-scores
 */
export default function TestScores() {
  // Match EN DIRECT
  const matchLive: EventCaming = {
    fixture: {
      id: 1,
      referee: "Test",
      timezone: "UTC",
      date: new Date().toISOString(),
      timestamp: Date.now() / 1000,
      periods: { first: null, second: null },
      venue: { id: 1, name: "Test Stadium", city: "Paris" },
      status: {
        long: "First Half",
        short: "1H",
        elapsed: 35,
      },
    },
    teams: {
      home: {
        id: 1,
        name: "Paris Saint-Germain",
        logo: "https://media.api-sports.io/football/teams/85.png",
        winner: null,
      },
      away: {
        id: 2,
        name: "Olympique Marseille",
        logo: "https://media.api-sports.io/football/teams/81.png",
        winner: null,
      },
    },
    goals: {
      home: 2,
      away: 1,
    },
  };

  // Match TERMINÉ
  const matchFinished: EventCaming = {
    fixture: {
      id: 2,
      referee: "Test",
      timezone: "UTC",
      date: new Date().toISOString(),
      timestamp: Date.now() / 1000,
      periods: { first: null, second: null },
      venue: { id: 1, name: "Test Stadium", city: "Madrid" },
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
      },
    },
    teams: {
      home: {
        id: 3,
        name: "Real Madrid",
        logo: "https://media.api-sports.io/football/teams/541.png",
        winner: true,
      },
      away: {
        id: 4,
        name: "FC Barcelona",
        logo: "https://media.api-sports.io/football/teams/529.png",
        winner: false,
      },
    },
    goals: {
      home: 3,
      away: 0,
    },
    score: {
      fulltime: {
        home: 3,
        away: 0,
      },
    },
  };

  // Match À VENIR
  const matchUpcoming: EventCaming = {
    fixture: {
      id: 3,
      referee: null,
      timezone: "UTC",
      date: "2026-07-15T20:00:00+00:00",
      timestamp: 1783564800,
      periods: { first: null, second: null },
      venue: { id: 1, name: "Anfield", city: "Liverpool" },
      status: {
        long: "Not Started",
        short: "NS",
        elapsed: null,
      },
    },
    teams: {
      home: {
        id: 5,
        name: "Liverpool",
        logo: "https://media.api-sports.io/football/teams/40.png",
        winner: null,
      },
      away: {
        id: 6,
        name: "Chelsea",
        logo: "https://media.api-sports.io/football/teams/49.png",
        winner: null,
      },
    },
    goals: {
      home: null,
      away: null,
    },
  };

  // Match MI-TEMPS
  const matchHalftime: EventCaming = {
    fixture: {
      id: 4,
      referee: "Test",
      timezone: "UTC",
      date: new Date().toISOString(),
      timestamp: Date.now() / 1000,
      periods: { first: null, second: null },
      venue: { id: 1, name: "Allianz Arena", city: "Munich" },
      status: {
        long: "Halftime",
        short: "HT",
        elapsed: 45,
      },
    },
    teams: {
      home: {
        id: 7,
        name: "Bayern Munich",
        logo: "https://media.api-sports.io/football/teams/157.png",
        winner: null,
      },
      away: {
        id: 8,
        name: "Borussia Dortmund",
        logo: "https://media.api-sports.io/football/teams/165.png",
        winner: null,
      },
    },
    goals: {
      home: 1,
      away: 1,
    },
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 gap-8">
      <h1 className="text-3xl font-bold dark:text-white">
        🧪 Test des Statuts de Matchs
      </h1>

      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            🔴 Match EN DIRECT (1H)
          </h2>
          <Match {...matchLive} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            🟠 Match MI-TEMPS (HT)
          </h2>
          <Match {...matchHalftime} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            🟢 Match TERMINÉ (FT)
          </h2>
          <Match {...matchFinished} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            ⚪ Match À VENIR (NS)
          </h2>
          <Match {...matchUpcoming} />
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
        <p>Cette page de test montre les 4 états possibles d&apos;un match :</p>
        <ul className="list-disc ml-5 mt-2">
          <li>EN DIRECT : Badge rouge pulsant + scores rouges</li>
          <li>MI-TEMPS : Badge rouge + scores rouges + &quot;Mi-temps&quot;</li>
          <li>TERMINÉ : &quot;Terminé&quot; vert + scores verts</li>
          <li>À VENIR : Date + heure, pas de scores</li>
        </ul>
      </div>
    </main>
  );
}

"use client";

import CategorieTabs from "@/components/CategorieTabs";
import League from "@/components/League";
import MatchTabs from "@/components/MatchTabs";
import LoaderCercle from "@/components/LoaderCercle";
import { useLeaguesByType } from "@/hooks/useLeaguesByType";
import { JSX, Key, useState } from "react";

type TabType = "today" | "upcoming" | "live";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("today");
  const { leagues, isLoading, isError } = useLeaguesByType(activeTab);

  const getEmptyMessage = () => {
    switch (activeTab) {
      case "today":
        return {
          emoji: "⚽",
          title: "Pas de matchs aujourd'hui",
          subtitle: new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        };
      case "live":
        return {
          emoji: "🔴",
          title: "Aucun match en direct",
          subtitle: "Revenez plus tard pendant les heures de match",
        };
      case "upcoming":
        return {
          emoji: "🔜",
          title: "Pas de matchs à venir",
          subtitle: "Vérifiez plus tard",
        };
    }
  };

  const emptyMsg = getEmptyMessage();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="h-16"></div>

      {/* Onglets de navigation */}
      <MatchTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Categorie tabs */}
      <CategorieTabs />

      <div className="flex w-full">
        <div className="w-44 bg-yellow-100 max-md:hidden "></div>
        <div className="p-2 w-full flex gap-2 flex-col md:px-8">
          {isLoading ? (
            <LoaderCercle />
          ) : isError ? (
            <div className="flex flex-col items-center justify-center h-64 text-red-500 dark:text-red-400">
              <p className="text-2xl mb-4">❌</p>
              <p className="text-lg font-semibold">Erreur de chargement</p>
              <p className="text-sm mt-2">Veuillez réessayer plus tard</p>
            </div>
          ) : leagues && leagues.length > 0 ? (
            leagues.map(
              (
                item: (JSX.IntrinsicAttributes & {
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
                })[],
                index: Key | null | undefined,
              ) => {
                if (item && item?.length) {
                  return (
                    <div key={index} className="md:px-20 gap-2">
                      <League {...item?.[0]} />
                    </div>
                  );
                }
              },
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <p className="text-2xl mb-4">{emptyMsg.emoji}</p>
              <p className="text-lg font-semibold">{emptyMsg.title}</p>
              <p className="text-sm mt-2">{emptyMsg.subtitle}</p>
            </div>
          )}
          <div className="h-12"></div>
        </div>
      </div>
    </main>
  );
}


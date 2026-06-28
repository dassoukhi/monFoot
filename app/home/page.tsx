import CategorieTabs from "@/components/CategorieTabs";
import League from "@/components/League";
import getLeagues from "@/requests/leagues";
import { JSX, Key } from "react";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";
export default async function Home() {
  const data = await getLeagues();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="h-16"></div>
      {/* categorie tabs */}
      <CategorieTabs />
      <div className="flex w-full">
        <div className="w-44 bg-yellow-100 max-md:hidden "></div>
        <div className="p-2 w-full flex gap-2 flex-col md:px-8">
          {data && data.length > 0 ? (
            data.map(
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
              <p className="text-2xl mb-4">⚽</p>
              <p className="text-lg font-semibold">
                Pas de matchs aujourd&apos;hui
              </p>
              <p className="text-sm mt-2">
                {new Date().toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </p>
            </div>
          )}
          <div className="h-12"></div>
        </div>
      </div>
    </main>
  );
}

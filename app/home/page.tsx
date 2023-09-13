import CategorieTabs from "@/components/CategorieTabs";
import League from "@/components/League";
import getLeagues from "@/requests/leagues";
import { JSX, Key } from "react";

export default async function Home() {
  const data = await getLeagues();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      {/* categorie tabs */}
      <CategorieTabs />
      <div className="p-2 w-full flex flex-col gap-4">
        {data?.map(
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
            index: Key | null | undefined
          ) => {
            if (item && item?.length) {
              return <League key={index} {...item?.[0]} />;
            }
          }
        )}
        <div className="h-12"></div>
      </div>
    </main>
  );
}

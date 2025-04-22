import CategorieTabs from "@/components/CategorieTabs";
import League from "@/components/League";
import getLeagues from "@/requests/leagues";
import { JSX, Key } from "react";
import { revalidatePath } from "next/cache";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";
export default async function Home() {
  const data = await getLeagues();
  revalidatePath("/home");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="h-16"></div>
      {/* categorie tabs */}
      <CategorieTabs />
      <div className="flex w-full">
        <div className="w-44 bg-yellow-100 max-md:hidden "></div>
        <div className="p-2 w-full flex flex-col md:px-8">
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
                return (
                  <div key={index} className="md:px-20">
                    <League {...item?.[0]} />
                  </div>
                );
              }
            }
          )}
          <div className="h-12"></div>
        </div>
      </div>
    </main>
  );
}

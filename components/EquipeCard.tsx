"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Team from "./Team";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

type props = {
  teams: Team[];
};
function EquipeCard({ teams }: props) {
  const session = useSession();
  const [filterTeams, setFilterTeams] = useState<Team[]>(teams);
  const handleTeams = (motif: string) => {
    const temp = teams?.filter((team) =>
      team.name?.toLowerCase()?.includes(motif?.toLowerCase())
    );
    setFilterTeams(temp);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-2 md:w-3/5">
      <SearchBar handleData={handleTeams} />

      <div className="bg-slate-50 flex-1 py-4 px-8 flex flex-col gap-4 rounded-xl shadow-md pb-8 md:px-64">
        {filterTeams?.length ? (
          filterTeams?.map((item) => (
            <Team
              key={item?.id}
              team={item}
              session={session?.data as Session}
            />
          ))
        ) : (
          <div className="w-full flex flex-col items-center p-2 px-16 gap-2 bg-pink-50">
            <FaceFrownIcon className="h-12 w-12 text-gray-500" />
            <p className="text-gray-500">{"Aucun équipe trouvée"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EquipeCard;

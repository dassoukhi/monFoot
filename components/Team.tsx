import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

type props = {
  team: Team;
  session?: Session;
};
function Team({ team, session }: props) {
  const [currentTeam, setCurrentTeam] = useState(team);
  const addToFavorisClient = async () => {
    if (session && session.user) {
      setCurrentTeam({ ...team, checked: true });
      const res = await axios.put("/api/favoris", { id: team?.id });
    } else {
      signIn("google");
    }
  };
  const removeFavoris = async () => {
    if (session && session.user) {
      setCurrentTeam({ ...team, checked: false });
      const res = await axios.delete(`/api/favoris?id=${team?.id}`);
    } else {
      signIn("google");
    }
  };
  return (
    <div className="flex w-full items-center justify-center p-2 bg-blue-50 gap-4 rounded-md shadow-md">
      <div className="flex-1 flex items-center  gap-2 pl-2">
        <Image
          loader={() => currentTeam?.logo}
          src={currentTeam?.logo}
          alt="team"
          width={64}
          height={64}
          className="h-8 w-8"
        />
        <p className="text-xs text-gray-800 w-[180px] whitespace-nowrap overflow-hidden text-ellipsis text-left ">
          {currentTeam?.name}
        </p>
      </div>
      <div className="px-2 h-full">
        {currentTeam?.checked ? (
          <CheckCircleIcon
            className="h-6 w-6"
            color="white"
            fill="#4caf50"
            onClick={removeFavoris}
          />
        ) : (
          <PlusCircleIcon
            className="h-6 w-6"
            color="#9ca3af"
            onClick={addToFavorisClient}
          />
        )}
      </div>
    </div>
  );
}

export default Team;

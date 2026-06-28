import Image from "next/image";
import React from "react";
import { formatMatchDate, formatMatchTime } from "@/utils/dateFormat";

function Match({ fixture, teams }: EventCaming) {

  return (
    <div className="bg-blue-50 dark:bg-gray-700 rounded-r-lg flex flex-col pb-2 pt-1 items-center shadow-md">
      <div className="flex flex-col items-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">{formatMatchDate(fixture?.date)}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{formatMatchTime(fixture?.date)}</p>
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
          {/* score */}
          {/* <span className="text-2xl">{0}</span> */}
        </div>
        <div className="p-4 flex">
          <span className="text-lg">-</span>
        </div>
        <div className="flex-1 flex items-center justify-center  gap-4">
          {/* <span className="text-2xl">{0}</span> */}
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

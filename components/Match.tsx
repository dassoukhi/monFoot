import moment from "moment";
import Image from "next/image";
import React from "react";

const formatDate = (date: string) => {
  const current = moment(date);
  const day = current.date();
  const month = current.month() + 1;
  let dayText = "";

  switch (current.day()) {
    case 0:
      dayText = "Dim";
      break;
    case 1:
      dayText = "Lun";
      break;
    case 2:
      dayText = "Mar";
      break;
    case 3:
      dayText = "Mer";
      break;
    case 4:
      dayText = "Jeu";
      break;
    case 5:
      dayText = "Ven";
      break;
    case 6:
      dayText = "Sam";
      break;
  }
  return `${dayText},${day}/${month < 10 ? "0" + month : month}`;
};
function Match({ fixture, teams }: EventCaming) {
  //   console.log("fixture:", fixture, "temas:", teams);

  return (
    <div className="bg-blue-50 rounded-r-lg flex flex-col pb-2 pt-1 items-center shadow-md">
      <div>
        <p className="text-xs text-gray-500">{formatDate(fixture?.date)}</p>
      </div>
      <div className="flex w-full px-4 items-center ">
        <div className="flex-1 flex items-center justify-center  gap-4">
          <div className=" flex flex-col justify-center items-center gap-1">
            <Image
              loader={() => teams?.home?.logo}
              src={teams?.home?.logo}
              alt="team home"
              width={64}
              height={64}
              className="h-16 w-16"
            />
            <p className="text-xs text-gray-800 w-[100px] whitespace-nowrap overflow-hidden text-ellipsis text-center ">
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
              loader={() => teams?.away?.logo}
              src={teams?.away?.logo}
              alt="team away"
              width={64}
              height={64}
              className="h-16 w-16"
            />
            <p className="text-xs text-gray-800 w-[100px] whitespace-nowrap overflow-hidden text-ellipsis text-center ">
              {teams?.away?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Match;

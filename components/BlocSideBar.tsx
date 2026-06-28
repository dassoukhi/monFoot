import { type } from "os";
import React from "react";

type props = {
  title: string;
  blocs: { title: string }[];
};
function BlocSideBar({ title, blocs }: props) {
  return (
    <div className="flex flex-col items-start mt-2">
      {/* title */}
      <div className=" py-3 border-gray-400 dark:border-gray-600 w-full">
        <h1 className="uppercase text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
      </div>
      {blocs?.map((bloc) => (
        <div
          key={bloc.title}
          className=" py-3 border-t-[1px] border-gray-400 dark:border-gray-600 w-full"
        >
          <span className="font-light font-sans text-gray-700 dark:text-gray-300 text-sm">
            {bloc?.title}
          </span>
        </div>
      ))}
    </div>
  );
}

export default BlocSideBar;

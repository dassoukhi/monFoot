"use client";
import { leagues } from "@/utils/leagues";
import React from "react";

function CategorieTabs() {
  const handleClickScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      element.style.scrollMarginTop = "140px";
    }
  };

  return (
    <div className="bg-blue-50 dark:bg-gray-800 flex flex-row h-16 w-full gap-2 whitespace-nowrap overflow-x-scroll no-scrollbar sticky top-16 py-3 md:pl-48">
      {leagues?.map((categorie) => (
        <div
          className="p-2 bg-slate-200 dark:bg-gray-700 rounded-xl shadow-sm cursor-pointer hover:bg-slate-300 dark:hover:bg-gray-600 transition duration-150 ease-in-out"
          key={`cat${categorie.name}`}
          onClick={() => handleClickScroll(categorie.id)}
        >
          <p className="text-gray-700 dark:text-gray-200 text-sm">{categorie.name}</p>
        </div>
      ))}
    </div>
  );
}

export default CategorieTabs;

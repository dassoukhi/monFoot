"use client";
import { leagues } from "@/utils/leagues";
import React from "react";

function CategorieTabs() {
  const handleClickScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-blue-50 flex flex-row h-16 w-full gap-2 whitespace-nowrap overflow-x-scroll no-scrollbar sticky top-16 py-3 md:pl-48">
      {leagues?.map((categorie) => (
        <div
          className="p-2 bg-slate-200 rounded-xl shadow-sm cursor-pointer hover:bg-slate-300 transition duration-150 ease-in-out"
          key={`cat${categorie.name}`}
          onClick={() => handleClickScroll(categorie.id)}
        >
          <p className="text-gray-700 text-sm">{categorie.name}</p>
        </div>
      ))}
    </div>
  );
}

export default CategorieTabs;

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
    <div className="bg-blue-50 flex flex-row p-2 w-full gap-2 whitespace-nowrap overflow-x-scroll no-scrollbar sticky top-0">
      {leagues?.map((categorie) => (
        <div
          className="p-2 bg-slate-200 rounded-xl shadow-sm  cursor-pointer hover:bg-slate-300"
          key={categorie.name}
          onClick={() => handleClickScroll(categorie.id)}
        >
          <p className="text-gray-700 text-sm">{categorie.name}</p>
        </div>
      ))}
    </div>
  );
}

export default CategorieTabs;

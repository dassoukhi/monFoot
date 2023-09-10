import { leagues } from "@/utils/leagues";
import React from "react";

function CategorieTabs() {
  return (
    <div className="bg-blue-50 flex flex-row p-2 w-full gap-2 whitespace-nowrap overflow-x-scroll no-scrollbar">
      {leagues?.map((categorie) => (
        <div
          className="p-2 bg-slate-200 rounded-xl shadow-sm"
          key={categorie.name}
        >
          <p className="text-gray-700 text-sm">{categorie.name}</p>
        </div>
      ))}
    </div>
  );
}

export default CategorieTabs;

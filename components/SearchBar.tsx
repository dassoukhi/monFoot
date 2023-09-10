"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

type props = {
  handleData?: (motif: string) => void;
};
function SearchBar({ handleData }: props) {
  const [search, setSearch] = useState<string>("");
  console.log("search:", search);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target?.value);
    if (handleData) {
      handleData(event?.target?.value);
    }
  };
  return (
    <div className="bg-slate-100 p-2 mb-4 flex rounded-2xl">
      <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
      <input
        type="text"
        placeholder="Rechercher"
        value={search}
        onChange={handleChange}
        className="flex-1 bg-transparent outline-none px-2 text-base text-gray-600 placeholder:text-base"
      />
    </div>
  );
}

export default SearchBar;

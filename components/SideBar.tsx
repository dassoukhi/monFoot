import React from "react";
import SearchBar from "./SearchBar";
import BlocSideBar from "./BlocSideBar";
type propss = {
  isOpen: boolean;
};
const blocSupport = [
  { title: "Contactez-nous" },
  { title: "CGU" },
  { title: "Mentions légales" },
  { title: "Cookies" },
  { title: "Protection des données" },
  { title: "Paramétrer mon consentement" },
];
const blocFollow = [
  { title: "Facebook" },
  { title: "Twitter" },
  { title: "Youtube" },
  { title: "Instagram" },
  { title: "Tiktok" },
];
function SideBar({ isOpen }: propss) {
  return (
    <div
      className={`top-[65px] left-0 w-[100vw] overflow-y-scroll bg-blue-50 fixed sidebar-content ease-in-out duration-300 flex justify-start ${
        isOpen ? "translate-x-0 " : "-translate-x-full"
      }`}
    >
      <div className="p-4 flex-1">
        {/* Search */}
        <SearchBar />
        {/* Bloacs */}
        <BlocSideBar title={"Support"} blocs={blocSupport} />
        <BlocSideBar title={"Suivez-nous"} blocs={blocFollow} />
        {/* empty */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}

export default SideBar;

"use client";
import React from "react";
import ItemBar from "./ItemBar";
import {
  HomeIcon,
  BellAlertIcon,
  UserIcon,
  HeartIcon,
  LifebuoyIcon,
  Bars4Icon,
} from "@heroicons/react/20/solid";
import { useSideBar } from "@/context/SideBarContext";

const itemsList = [
  { name: "Home", Icon: HomeIcon, path: "/home" },
  { name: "Favoris", Icon: HeartIcon, path: "/favoris" },
  { name: "Équipes", Icon: LifebuoyIcon, path: "/equipes" },
  { name: "Notifications", Icon: BellAlertIcon, path: "/notifications" },
];
function NavBar() {
  const { isOpen, handleSideBar } = useSideBar();
  return (
    <div
      className={`fixed w-full bottom-0 overflow-y-scroll px-4 pb-5 pt-1 bg-blue-50 flex justify-between border-t-[1px] border-gray-200 md:top-16  md:left-0 md:flex-col md:w-44 md:justify-normal md:gap-6 md:pt-4 md:px-0 z-50 ${
        isOpen && "md:shadow-2xl"
      }`}
    >
      <div className="max-sm:hidden" onClick={() => handleSideBar()}>
        <ItemBar Icon={Bars4Icon} name="Menu" path="#" />
      </div>
      {itemsList?.map(({ name, Icon, path }, index) => (
        <ItemBar key={index} name={name} Icon={Icon} path={path} />
      ))}
    </div>
  );
}

export default NavBar;

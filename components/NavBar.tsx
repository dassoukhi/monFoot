"use client";
import React from "react";
import ItemBar from "./ItemBar";
import {
  HomeIcon,
  BellAlertIcon,
  UserIcon,
  HeartIcon,
  LifebuoyIcon,
} from "@heroicons/react/20/solid";

const itemsList = [
  { name: "Home", Icon: HomeIcon, path: "/home" },
  { name: "Favoris", Icon: HeartIcon, path: "/favoris" },
  { name: "Équipes", Icon: LifebuoyIcon, path: "/equipes" },
  { name: "Notifications", Icon: BellAlertIcon, path: "/notifications" },
];
function NavBar() {
  return (
    <div className="fixed w-full bottom-0 px-4 pb-5 pt-1 bg-blue-50 flex justify-between border-t-[1px] border-gray-200">
      {itemsList?.map(({ name, Icon, path }, index) => (
        <ItemBar key={index} name={name} Icon={Icon} path={path} />
      ))}
    </div>
  );
}

export default NavBar;

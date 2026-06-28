"use client";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";
// import useScrollDirection from "@/lib/useScrollDirection";
import { signIn, signOut, useSession } from "next-auth/react";
import Avatar from "./Avatar";
import SideBar from "./SideBar";
import Image from "next/image";
import monFoot from "@/app/MonFoot.png";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import { useSideBar } from "@/context/SideBarContext";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const session = useSession();
  // const [openSideBar, setOpenSideBar] = useState(false);
  const { isOpen, handleSideBar } = useSideBar();

  // const scrollDirection = useScrollDirection();
  return (
    <div
      className={`bg-blue-50 dark:bg-gray-800 shadow-md fixed w-full h-16 px-2 flex items-center justify-between z-50`}
    >
      <SideBar isOpen={isOpen} />
      <div className="flex items-center gap-2">
        {isOpen ? (
          <div className="md:hidden">
            <XMarkIcon
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              onClick={() => handleSideBar()}
            />
          </div>
        ) : (
          <div className="md:hidden">
            <Bars4Icon
              className="h-6 w-6 text-black-500 dark:text-gray-300"
              onClick={() => handleSideBar()}
            />
          </div>
        )}
      </div>
      <Image
        src={monFoot}
        width={64}
        height={64}
        alt="MonFoot"
        className="w-20"
      />
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {session?.status !== "authenticated" ? (
          <ArrowLeftOnRectangleIcon
            className="h-8 w-8 text-gray-600 dark:text-gray-300 mr-1"
            onClick={() => signIn()}
          />
        ) : (
          <Avatar
            url={session?.data?.user?.image as string}
            onClick={() => signOut()}
          />
        )}
      </div>
    </div>
  );
}

export default Header;

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

function Header() {
  const session = useSession();
  // const [openSideBar, setOpenSideBar] = useState(false);
  const { isOpen, handleSideBar } = useSideBar();

  // const scrollDirection = useScrollDirection();
  return (
    <div
      className={`bg-blue-50 shadow-md fixed w-full h-16 px-2 flex items-center justify-between z-50`}
    >
      <SideBar isOpen={isOpen} />
      <div className="">
        {isOpen ? (
          <div className="md:hidden">
            <XMarkIcon
              className="h-6 w-6 text-gray-600"
              onClick={() => handleSideBar()}
            />
          </div>
        ) : (
          <div className="md:hidden">
            {" "}
            <Bars4Icon
              className="h-6 w-6 text-black-500"
              onClick={() => handleSideBar()}
            />
          </div>
        )}
      </div>
      <Image
        src={monFoot}
        width={64}
        height={64}
        alt="MonSam"
        className="w-20"
      />
      {session?.status !== "authenticated" ? (
        // <Button text={"Se connecter"} onClick={() => signIn()} />
        <ArrowLeftOnRectangleIcon
          className="h-8 w-8 text-gray-600 mr-1"
          onClick={() => signIn()}
        />
      ) : (
        <Avatar
          url={session?.data?.user?.image as string}
          onClick={() => signOut()}
        />
      )}
    </div>
  );
}

export default Header;

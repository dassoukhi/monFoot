"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

const GoogleIcon =
  "https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA";
function Search() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  return (
    <main className="flex min-h-screen flex-col p-2">
      <div className="p-4 w-full h-[70vh] rounded-lg flex justify-center items-center">
        <a
          className="bg-gray-700 py-2  leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center gap-4"
          onClick={() => signIn("google", { callbackUrl: callbackUrl })}
          role="button"
        >
          <Image
            className="h-8 w-8"
            loader={() => GoogleIcon}
            src={GoogleIcon}
            alt="GoogleIcon"
            height={64}
            width={64}
          />
          <p className="text-white font-light text-xs">
            {"Continue avec Google"}
          </p>
        </a>
      </div>
    </main>
  );
}

export default Search;

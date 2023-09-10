import { signOut } from "next-auth/react";
import Image from "next/image";
import React, { HTMLAttributes } from "react";
interface props extends HTMLAttributes<HTMLDivElement> {
  url: string;
}
function Avatar({ url, ...res }: props) {
  return (
    <div onClick={() => signOut()} {...res}>
      <Image
        src={url}
        alt="profil photo"
        className=" h-10 w-10 rounded-full"
        height={64}
        width={64}
      />
    </div>
  );
}

export default Avatar;

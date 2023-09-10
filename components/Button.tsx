import { signIn } from "next-auth/react";
import React, { ButtonHTMLAttributes } from "react";
interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}
function Button({ text, ...res }: props) {
  return (
    <button
      className="p-[6px] bg-gray-700 text-gray-100 rounded-xl text-xs py-2"
      {...res}
    >
      {text}
    </button>
  );
}

export default Button;

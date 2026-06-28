import { signIn } from "next-auth/react";
import React, { ButtonHTMLAttributes } from "react";
interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}
function Button({ text, ...res }: props) {
  return (
    <button
      className="p-[6px] bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-100 rounded-xl text-xs py-2 transition-colors"
      {...res}
    >
      {text}
    </button>
  );
}

export default Button;

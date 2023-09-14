import React from "react";
type props = {
  name: string;
  path: string;
  Icon: React.ElementType;
};
import { usePathname } from "next/navigation";
import Link from "next/link";

function ItemBar({ name, path, Icon }: props) {
  const routePath = usePathname();
  const active = routePath?.includes(path);
  return (
    <Link href={name === "Menu" ? "#" : path}>
      <div
        className={`text-xs flex flex-col items-center cursor-pointer md:flex-row md:gap-3 md:p-2 md:hover:bg-slate-300 duration-300 ease-in-out text-gray-700 ${
          active && "md:bg-slate-300"
        }`}
      >
        {Icon && (
          <Icon
            className={`h-6 w-6 ${
              active ? "text-gray-800" : "text-gray-400"
            } hover:text-gray-800`}
          />
        )}
        <p
          className={`${
            active ? "text-gray-800" : "text-gray-400"
          } hover:text-gray-800 md:text-sm`}
        >
          {name}
        </p>
      </div>
    </Link>
  );
}

export default ItemBar;

import React from "react";
type props = {
  name: string;
  path: string;
  Icon: React.ElementType;
};
import { usePathname, useRouter } from "next/navigation";

function ItemBar({ name, path, Icon }: props) {
  const router = useRouter();
  const routePath = usePathname();
  const active = routePath?.includes(path);
  return (
    <div
      className="text-xs flex flex-col items-center cursor-pointer"
      onClick={() => router.push(path)}
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
        } hover:text-gray-800`}
      >
        {name}
      </p>
    </div>
  );
}

export default ItemBar;

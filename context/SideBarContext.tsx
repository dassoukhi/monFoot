"use client";
import React, { useContext, useState } from "react";

type SideBarContextType = {
  handleSideBar: () => void;
  isOpen: boolean;
};

const SideBarContext = React.createContext<SideBarContextType>({
  handleSideBar: () => {},
  isOpen: false,
});
type SideBarProviderProps = {
  children: React.ReactNode;
};

export default function SideBarProvider({ children }: SideBarProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <SideBarContext.Provider value={{ isOpen, handleSideBar }}>
      {children}
    </SideBarContext.Provider>
  );
}

export const useSideBar: () => SideBarContextType = () =>
  useContext(SideBarContext);

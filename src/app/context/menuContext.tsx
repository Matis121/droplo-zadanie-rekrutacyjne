"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

type MenuItem = {
  id: string;
  name: string;
  link: string;
  subMenu?: MenuItem[];
};

type MenuContextType = {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    // {
    //   id: uuidv4(),
    //   name: "Home",
    //   link: "/home",
    // },
    // {
    //   id: uuidv4(),
    //   name: "About",
    //   link: "/about",
    // },
    // {
    //   id: uuidv4(),
    //   name: "Services",
    //   link: "/services",
    //   subMenu: [
    //     {
    //       id: uuidv4(),
    //       name: "Web Development",
    //       link: "/services/web-development",
    //       subMenu: [
    //         {
    //           id: uuidv4(),
    //           name: "Frontend Development",
    //           link: "/services/web-development/frontend",
    //         },
    //       ],
    //     },
    //     {
    //       id: uuidv4(),
    //       name: "SEO Optimization",
    //       link: "/services/seo",
    //     },
    //     {
    //       id: uuidv4(),
    //       name: "UI/UX Design",
    //       link: "/services/ui-ux",
    //     },
    //   ],
    // },
    // {
    //   id: uuidv4(),
    //   name: "Blog",
    //   link: "/blog",
    // },
    // {
    //   id: uuidv4(),
    //   name: "Contact",
    //   link: "/contact",
    // },
  ]);

  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};

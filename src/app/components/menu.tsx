"use client";

import { useState } from "react";
import EmptyMenu from "./emptyMenu";
import MenuList from "./menuList";
import { v4 as uuidv4 } from "uuid";

const dummyData: MenuItem[] = [
  {
    id: uuidv4(),
    name: "Home",
    link: "/home",
  },
  {
    id: uuidv4(),
    name: "About",
    link: "/about",
  },
  {
    id: uuidv4(),
    name: "Services",
    link: "/services",
    subMenu: [
      {
        id: uuidv4(),
        name: "Web Development",
        link: "/services/web-development",
        subMenu: [
          {
            id: uuidv4(),
            name: "Frontend Development",
            link: "/services/web-development/frontend",
          },
        ],
      },
      {
        id: uuidv4(),
        name: "SEO Optimization",
        link: "/services/seo",
      },
      {
        id: uuidv4(),
        name: "UI/UX Design",
        link: "/services/ui-ux",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Blog",
    link: "/blog",
  },
  {
    id: uuidv4(),
    name: "Contact",
    link: "/contact",
  },
];

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(dummyData);

  return (
    <>
      {menuItems.length === 0 ? (
        <EmptyMenu />
      ) : (
        <MenuList menuItems={menuItems} setMenuItems={setMenuItems} />
      )}
    </>
  );
}

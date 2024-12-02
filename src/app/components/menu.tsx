"use client";

import { useState } from "react";
import EmptyMenu from "./emptyMenu";
import MenuList from "./menuList";

const dummyData: MenuItem[] = [
  {
    name: "Home",
    link: "/home",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Services",
    link: "/services",
    subMenu: [
      {
        name: "Web Development",
        link: "/services/web-development",
        subMenu: [
          {
            name: "Web Development",
            link: "/services/web-development",
          },
        ],
      },
      {
        name: "SEO Optimization",
        link: "/services/seo",
      },
      {
        name: "UI/UX Design",
        link: "/services/ui-ux",
      },
    ],
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
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
        <MenuList menuItems={menuItems} />
      )}
    </>
  );
}

"use client";

import EmptyMenu from "./emptyMenu";
import MenuList from "./menuList";
import { useMenu } from "../context/menuContext";

export default function Menu() {
  const { menuItems } = useMenu();

  return (
    <div className="w-full max-w-[1168px]">
      {menuItems.length === 0 ? <EmptyMenu /> : <MenuList />}
    </div>
  );
}

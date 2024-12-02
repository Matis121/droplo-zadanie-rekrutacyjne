"use client";

import EmptyMenu from "./emptyMenu";
import MenuList from "./menuList";
import { useMenu } from "../context/menuContext";

export default function Menu() {
  const { menuItems } = useMenu();

  return <>{menuItems.length === 0 ? <EmptyMenu /> : <MenuList />}</>;
}

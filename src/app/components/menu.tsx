"use client";

import { useState } from "react";
import EmptyMenu from "./emptyMenu";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  return <>{menuItems.length === 0 ? <EmptyMenu /> : <div>Menu</div>}</>;
}

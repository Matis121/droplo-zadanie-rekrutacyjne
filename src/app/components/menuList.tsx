import { useState } from "react";
import MenuItem from "./menuItem";
import { AddMenuItemForm } from "./menuForms/menuForms";
import { useMenu } from "../context/menuContext";

export default function MenuList() {
  const { menuItems } = useMenu();
  const [isVisibleForm, setisVisibleForm] = useState(false);

  const renderMenu = (items: MenuItem[]) => {
    return items.map((item) => (
      <div key={item.id}>
        <MenuItem name={item.name} link={item.link} id={item.id} />
        {item.subMenu && (
          <div className="ml-16">{renderMenu(item.subMenu)}</div>
        )}
      </div>
    ));
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden shadow-sm bg-[#F9FAFB]">
        <div>{renderMenu(menuItems)}</div>
        {isVisibleForm && (
          <div className="py-[16px] px-[24px] bg-[#F9FAFB]">
            <AddMenuItemForm setIsFormVisible={setisVisibleForm} />
          </div>
        )}
        <div className="px-[24px] py-[20px] bg-[#f5f5f5]">
          <button
            className="border py-[10px] px-[14px] rounded-lg bg-white shadow-sm text-sm font-semibold color-[#344054]"
            onClick={() => setisVisibleForm(true)}
          >
            Dodaj pozycję menu
          </button>
        </div>
      </div>
    </>
  );
}

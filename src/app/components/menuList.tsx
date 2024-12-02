import { useState } from "react";
import MenuItem from "./menuItem";
import { AddMenuItemForm } from "./menuForms/menuForms";
import { Dispatch, SetStateAction } from "react";

export default function MenuList({
  menuItems,
  setMenuItems,
}: {
  menuItems: MenuItem[];
  setMenuItems: Dispatch<SetStateAction<MenuItem[]>>;
}) {
  const [isVisibleForm, setisVisibleForm] = useState(false);

  const handleDeleteItem = (id: string) => {
    const deleteItem = (menu: MenuItem[], id: string): MenuItem[] => {
      return menu
        .filter((item) => item.id !== id)
        .map((item) => {
          if (item.subMenu) {
            return {
              ...item,
              subMenu: deleteItem(item.subMenu, id),
            };
          }
          return item;
        });
    };
    const updatedMenu = deleteItem(menuItems, id);
    setMenuItems(updatedMenu);
  };

  const handleUpdateItem = (
    id: string,
    updatedData: { name: string; link: string }
  ) => {
    const updateItem = (
      menu: MenuItem[],
      id: string,
      updatedData: { name: string; link: string }
    ): MenuItem[] => {
      return menu.map((item) => {
        if (item.id === id) {
          return { ...item, ...updatedData };
        }
        if (item.subMenu) {
          return {
            ...item,
            subMenu: updateItem(item.subMenu, id, updatedData),
          };
        }
        return item;
      });
    };
    const updatedMenu = updateItem(menuItems, id, updatedData);
    setMenuItems(updatedMenu);
  };

  const renderMenu = (items: MenuItem[]) => {
    return items.map((item) => (
      <div key={item.id}>
        <MenuItem
          handleDeleteItem={handleDeleteItem}
          name={item.name}
          link={item.link}
          id={item.id}
          handleUpdateItem={handleUpdateItem}
        />
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

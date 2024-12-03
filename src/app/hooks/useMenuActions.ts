import { useMenu } from "../context/menuContext";
import { v4 as uuidv4 } from "uuid";
import { MenuItem } from "../types/types";

export const useMenuActions = () => {
  const { menuItems, setMenuItems } = useMenu();

  const handleAddItem = (
    parentId: string | null,
    name: string,
    url: string
  ) => {
    const newItem = {
      id: uuidv4(),
      name,
      link: url,
      subMenu: [],
    };
    const handleAddItemRecursive = (
      menu: MenuItem[],
      parentId: string,
      newItem: MenuItem
    ): MenuItem[] => {
      return menu.map((item) =>
        item.id === parentId
          ? {
              ...item,
              subMenu: item.subMenu ? [...item.subMenu, newItem] : [newItem],
            }
          : {
              ...item,
              subMenu: item.subMenu
                ? handleAddItemRecursive(item.subMenu, parentId, newItem)
                : item.subMenu,
            }
      );
    };
    const updatedMenu =
      parentId === null
        ? [...menuItems, newItem]
        : menuItems.map((item) =>
            item.id === parentId
              ? {
                  ...item,
                  subMenu: item.subMenu
                    ? [...item.subMenu, newItem]
                    : [newItem],
                }
              : {
                  ...item,
                  subMenu: item.subMenu
                    ? handleAddItemRecursive(item.subMenu, parentId, newItem)
                    : item.subMenu,
                }
          );
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

  return { handleDeleteItem, handleUpdateItem, handleAddItem };
};

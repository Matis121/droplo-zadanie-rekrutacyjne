import { useMenu } from "../context/menuContext";

export const useMenuActions = () => {
  const { menuItems, setMenuItems } = useMenu();

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

  return { handleDeleteItem, handleUpdateItem };
};

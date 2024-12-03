import { arrayMove } from "@dnd-kit/sortable";

type ItemAndParent = {
  item: any;
  parent: any[];
  parentIndex: number;
} | null;

export const handleDragEnd = (
  event: any,
  setMenuItems: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const { active, over } = event;

  if (!active || !over || active.id === over.id) return;

  const deepCloneMenu = (menu: any[]): any[] => {
    return menu.map((item) => ({
      ...item,
      subMenu: item.subMenu ? deepCloneMenu(item.subMenu) : undefined,
    }));
  };

  const findItemAndParent = (items: any[], id: string): ItemAndParent => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.id === id) return { item, parent: items, parentIndex: i };
      if (item.subMenu) {
        const subResult = findItemAndParent(item.subMenu, id);
        if (subResult) return subResult;
      }
    }
    return null;
  };

  setMenuItems((currentMenu) => {
    const updatedMenu = deepCloneMenu(currentMenu);

    const activeItem = findItemAndParent(updatedMenu, active.id);
    const overItem = findItemAndParent(updatedMenu, over.id);

    if (!activeItem || !overItem) return currentMenu;

    const { item: activeTask, parent: activeParent } = activeItem;
    const { item: overTask, parent: overParent } = overItem;

    if (activeParent !== overParent) return currentMenu;

    const sourceIndex = activeParent.findIndex(
      (task) => task.id === activeTask.id
    );
    const targetIndex = activeParent.findIndex(
      (task) => task.id === overTask.id
    );

    const reorderedParent = arrayMove(activeParent, sourceIndex, targetIndex);

    activeParent.splice(0, activeParent.length, ...reorderedParent);

    return updatedMenu;
  });
};

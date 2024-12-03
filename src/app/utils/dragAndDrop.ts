import { arrayMove } from "@dnd-kit/sortable";
import { ItemAndParent, MenuItem } from "../types/types";
import { DragEndEvent } from "@dnd-kit/core";

export const handleDragEnd = (
  event: DragEndEvent,
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>
) => {
  const { active, over } = event;

  if (!active || !over || active.id === over.id) return;

  const deepCloneMenu = (menu: MenuItem[]): MenuItem[] => {
    return menu.map((item) => ({
      ...item,
      subMenu: item.subMenu ? deepCloneMenu(item.subMenu) : undefined,
    }));
  };

  const findItemAndParent = (
    items: MenuItem[],
    id: string
  ): ItemAndParent | null => {
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

    const activeItem = findItemAndParent(updatedMenu, active.id as string);
    const overItem = findItemAndParent(updatedMenu, over.id as string);

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

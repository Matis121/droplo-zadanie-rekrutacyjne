import { arrayMove } from "@dnd-kit/sortable";
import { useMenu } from "../context/menuContext";

export const handleDragEnd = (
  event: any,
  menuItems: any[],
  setMenuItems: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const { active, over } = event;

  const getTaskPos = (id: string) =>
    menuItems.findIndex((task) => task.id === id);

  if (active.id === over.id) return;

  setMenuItems((items) => {
    const originalPos = getTaskPos(active.id);
    const newPos = getTaskPos(over.id);

    return arrayMove(items, originalPos, newPos);
  });
};

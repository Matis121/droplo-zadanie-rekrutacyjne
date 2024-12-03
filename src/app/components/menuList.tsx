import { useState } from "react";
import { AddMenuItemForm } from "./menuForms/menuForms";
import { useMenu } from "../context/menuContext";
import { renderMenu } from "../utils/renderMenu";
import {
  closestCorners,
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { handleDragEnd } from "../utils/dragAndDrop";

export default function MenuList() {
  const { menuItems, setMenuItems } = useMenu();

  const [isVisibleForm, setisVisibleForm] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  return (
    <>
      <div className="border border-[--border-color-primary] bg-[--bg-secondary] rounded-lg overflow-hidden">
        <DndContext
          onDragEnd={(event) => handleDragEnd(event, menuItems, setMenuItems)}
          collisionDetection={closestCorners}
          sensors={sensors}
        >
          {renderMenu(menuItems)}
        </DndContext>
        {isVisibleForm && (
          <div className="py-[16px] px-[24px] bg-[--bg-secondary]">
            <AddMenuItemForm
              parentId={null}
              setIsFormVisible={setisVisibleForm}
            />
          </div>
        )}
        <div className="px-[24px] py-[20px] bg-[--background] border-t border-[--border-color-primary] mt-[-1px]">
          <button
            className="border border-[--border-color-primary] py-[10px] px-[14px] rounded-lg shadow-xs text-[--text-secondary] text-sm font-semibold bg-white"
            onClick={() => setisVisibleForm(true)}
          >
            Dodaj pozycję menu
          </button>
        </div>
      </div>
    </>
  );
}

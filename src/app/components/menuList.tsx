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
      <div className="border rounded-lg overflow-hidden shadow-sm bg-[#F9FAFB]">
        <DndContext
          onDragEnd={(event) => handleDragEnd(event, menuItems, setMenuItems)}
          collisionDetection={closestCorners}
          sensors={sensors}
        >
          {renderMenu(menuItems)}
        </DndContext>
        {isVisibleForm && (
          <div className="py-[16px] px-[24px] bg-[#F9FAFB]">
            <AddMenuItemForm
              parentId={null}
              setIsFormVisible={setisVisibleForm}
            />
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

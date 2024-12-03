import Image from "next/image";
import { AddMenuItemForm, EditMenuItemForm } from "./menuForms/menuForms";
import { useState } from "react";
import { useMenuActions } from "../hooks/useMenuActions";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MenuItemProps } from "../types/types";
import { ActionButtons as ActionButtonsType } from "../types/types";

const ActionButtons = ({ onDelete, onEdit, onAdd }: ActionButtonsType) => (
  <div className="border border-[--border-color-primary] rounded-lg flex">
    <button
      className="py-[10px] px-[16px] border-r border-[--border-color-primary] text-sm font-semibold text-[--text-secondary]"
      onClick={onDelete}
    >
      Usuń
    </button>
    <button
      className="py-[10px] px-[16px] border-r border-[--border-color-primary] text-sm font-semibold text-[--text-secondary]"
      onClick={onEdit}
    >
      Edytuj
    </button>
    <button
      className="py-[10px] px-[16px] text-sm font-semibold text-[--text-secondary]"
      onClick={onAdd}
    >
      Dodaj pozycję menu
    </button>
  </div>
);

export default function MenuItem({
  id,
  name,
  link,
  hasSubMenu,
}: MenuItemProps) {
  const [activeForm, setActiveForm] = useState<"add" | "edit" | null>(null);

  const { handleDeleteItem } = useMenuActions();

  // DND-KIT logic
  const { listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div style={style} ref={setNodeRef}>
      <div
        className={`bg-white px-[24px] py-[16px] flex gap-[4px] items-center border border-[--border-color-secondary] mt-[-1px] ${
          hasSubMenu && "rounded-bl-lg"
        }`}
      >
        <div className="p-[10px] cursor-pointer" {...listeners}>
          <Image src="/drag-icon.svg" alt="drag icon" width={20} height={20} />
        </div>
        <div className={`flex flex-col ${link ? "gap-[6px]" : "gap-0"}`}>
          <h3 className="text-sm font-semibold text-[--text-primary]">
            {name}
          </h3>
          <p className="text-sm font-normal text-[--text-tertiary]">{link}</p>
        </div>
        <div className="flex ml-auto z-50">
          <ActionButtons
            onDelete={() => handleDeleteItem(id)}
            onEdit={() => setActiveForm("edit")}
            onAdd={() => setActiveForm("add")}
          />
        </div>
      </div>
      {activeForm === "add" && (
        <div className="pl-[64px] pr-[24px] py-[16px] bg-[--bg-secondary]">
          <AddMenuItemForm
            parentId={id}
            setIsFormVisible={() => setActiveForm(null)}
          />
        </div>
      )}
      {activeForm === "edit" && (
        <div className="px-[24px] py-[16px] bg-[--bg-secondary]">
          <EditMenuItemForm
            itemData={{ id, name, link }}
            setIsFormVisible={() => setActiveForm(null)}
          />
        </div>
      )}
    </div>
  );
}

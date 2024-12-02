import Image from "next/image";
import { AddMenuItemForm, EditMenuItemForm } from "./menuForms/menuForms";
import { useState } from "react";
import { useMenuActions } from "../hooks/useMenuActions";

type MenuItem = {
  id: string;
  name: string;
  link: string;
};

export default function MenuItem({ id, name, link }: MenuItem) {
  const [activeForm, setActiveForm] = useState<"add" | "edit" | null>(null);

  const handleToggleForm = (formType: "add" | "edit") => {
    setActiveForm((prevState) => (prevState === formType ? null : formType));
  };

  const { handleDeleteItem } = useMenuActions();

  return (
    <>
      <div className="bg-white px-[24px] py-[16px] flex items-center border">
        <div className="p-[10px]">
          <Image src="/drag-icon.svg" alt="drag icon" width={20} height={20} />
        </div>
        <div className="flex flex-col gap-[6px]">
          <h3 className="text-sm font-semibold color-[#101828]">{name}</h3>
          <p className="text-sm font-normal color-[#475467]">{link}</p>
        </div>
        <div className="flex ml-auto">
          <div className="border rounded-lg flex">
            <button
              className="py-[10px] px-[16px] border-r text-sm font-semibold color-[#344054]"
              onClick={() => handleDeleteItem(id)}
            >
              Usuń
            </button>
            <button
              className="py-[10px] px-[16px] border-r text-sm font-semibold color-[#344054]"
              onClick={() => handleToggleForm("edit")}
            >
              Edytuj
            </button>
            <button
              className="py-[10px] px-[16px] text-sm font-semibold color-[#344054]"
              onClick={() => handleToggleForm("add")}
            >
              Dodaj pozycję menu
            </button>
          </div>
        </div>
      </div>
      {activeForm === "add" && (
        <div className="pl-[64px] pr-[24px] py-[16px]">
          <AddMenuItemForm setIsFormVisible={() => setActiveForm(null)} />
        </div>
      )}
      {activeForm === "edit" && (
        <div className="px-[24px] py-[16px]">
          <EditMenuItemForm
            itemData={{ id, name, link }}
            setIsFormVisible={() => setActiveForm(null)}
          />
        </div>
      )}
    </>
  );
}

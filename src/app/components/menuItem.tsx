import Image from "next/image";
import MenuItemForm from "./menuItemForm";
import { useState } from "react";

export default function MenuItem({
  name,
  link,
  id,
  handleDeleteItem,
}: {
  name: string;
  link: string;
  id: string;
  handleDeleteItem: (id: string) => void;
}) {
  const [isVisibleForm, setIsVisibleForm] = useState(false);

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
            <button className="py-[10px] px-[16px] border-r text-sm font-semibold color-[#344054]">
              Edytuj
            </button>
            <button
              className="py-[10px] px-[16px] text-sm font-semibold color-[#344054]"
              onClick={() => setIsVisibleForm(true)}
            >
              Dodaj pozycję menu
            </button>
          </div>
        </div>
      </div>
      {isVisibleForm && (
        <div className="pl-[64px] pr-[24px] py-[16px]">
          <MenuItemForm setIsFormVisible={setIsVisibleForm} />
        </div>
      )}
    </>
  );
}

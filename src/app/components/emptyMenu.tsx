import Image from "next/image";
import { useState } from "react";
import { AddMenuItemForm } from "./menuForms/menuForms";

export default function EmptyMenu() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <>
      {isFormVisible ? (
        <AddMenuItemForm parentId={null} setIsFormVisible={setIsFormVisible} />
      ) : (
        <div className="bg-[--bg-secondary] flex items-center justify-center flex-col gap-[24px] py-[24px] rounded-lg border border-[--border-color-secondary]">
          <div className="flex items-center flex-col gap-1">
            <h2 className="font-semibold text-base text-[--text-primary]">
              Menu jest puste
            </h2>
            <p className="font-normal text-sm text-[--text-secondary]">
              W tym menu nie ma jeszcze żadnych linków.
            </p>
          </div>
          <button
            className="font-semibold text-sm text-white px-[14px] py-[10px] bg-[--bg-purple] border border-[--bg-purple] rounded-lg shadow-xs flex gap-[6px] items-center"
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            <Image
              src="/plus-icon.svg"
              alt="plus icon"
              width={20}
              height={20}
            />
            Dodaj pozycję menu
          </button>
        </div>
      )}
    </>
  );
}

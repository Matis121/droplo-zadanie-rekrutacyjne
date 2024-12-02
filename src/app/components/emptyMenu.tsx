import Image from "next/image";
import { useState } from "react";
import { AddMenuItemForm } from "./menuForms/menuForms";

export default function EmptyMenu() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <>
      {isFormVisible ? (
        <AddMenuItemForm setIsFormVisible={setIsFormVisible} />
      ) : (
        <div className="bg-[--bg-secondary] flex items-center justify-center flex-col gap-[24px] py-[24px] rounded-lg border">
          <div className="flex items-center flex-col gap-1">
            <h2 className="font-semibold text-base">Menu jest puste</h2>
            <p>W tym menu nie ma jeszcze żadnych linków.</p>
          </div>
          <button
            className="font-semibold text-base text-white px-[14px] py-[10px] bg-[#7F56D9] rounded-lg shadow-sm flex gap-[4px] items-center"
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

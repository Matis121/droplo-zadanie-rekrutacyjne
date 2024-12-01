import { Dispatch, SetStateAction } from "react";

export default function MenuItemForm({
  setIsFormVisible,
}: {
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="border rounded-lg pt-[20px] pl-[24px] pb-[20px] pr-[80px] flex flex-col gap-[20px] bg-white shadow-sm">
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-col gap-[6px]">
          <label
            htmlFor="nazwa"
            className="text-sm font-medium color-[#344054]"
          >
            Nazwa
          </label>
          <input
            type="text"
            id="nazwa"
            placeholder="np. Promocje"
            className="border shadow-sm py-[8px] px-[12px] rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-[6px]">
          <label htmlFor="link" className="text-sm font-medium color-[#344054]">
            Link
          </label>
          <input
            type="text"
            id="link"
            placeholder="Wklej lub wyszukaj"
            className="border shadow-sm py-[8px] px-[12px] rounded-lg"
          />
        </div>
      </div>
      <div className="flex gap-[8px]">
        <button
          className="border border-[#D0D5DD] py-[10px] px-[14px] rounded-lg shadow-sm text-[#344054] font-semibold"
          onClick={() => setIsFormVisible(false)}
        >
          Anuluj
        </button>
        <button className="border border-[#6941C6] py-[10px] px-[14px] rounded-lg shadow-sm text-[#6941C6] font-semibold">
          Dodaj
        </button>
      </div>
    </div>
  );
}

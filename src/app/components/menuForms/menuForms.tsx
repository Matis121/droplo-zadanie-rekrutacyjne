import { useMenuActions } from "@/app/hooks/useMenuActions";
import { Dispatch, SetStateAction, useState } from "react";

function MenuForm({
  name = "",
  link = "",
  onChangeName,
  onChangeLink,
}: {
  name?: string;
  link?: string;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeLink: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex flex-col gap-[6px]">
        <label htmlFor="nazwa" className="text-sm font-medium color-[#344054]">
          Nazwa
        </label>
        <input
          type="text"
          id="nazwa"
          value={name}
          onChange={onChangeName}
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
          value={link}
          onChange={onChangeLink}
          placeholder="Wklej lub wyszukaj"
          className="border shadow-sm py-[8px] px-[12px] rounded-lg"
        />
      </div>
    </div>
  );
}

export function AddMenuItemForm({
  parentId,
  setIsFormVisible,
}: {
  parentId: string | null;
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const { handleAddItem } = useMenuActions();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = () => {
    handleAddItem(parentId, name, link);
    setIsFormVisible(false);
  };

  return (
    <div className="border rounded-lg pt-[20px] pl-[24px] pb-[20px] pr-[80px] flex flex-col gap-[20px] bg-white shadow-sm">
      <MenuForm
        name={name}
        link={link}
        onChangeName={(e) => setName(e.target.value)}
        onChangeLink={(e) => setLink(e.target.value)}
      />
      <div className="flex gap-[8px]">
        <button
          className="border border-[#D0D5DD] py-[10px] px-[14px] rounded-lg shadow-sm text-[#344054] font-semibold"
          onClick={() => setIsFormVisible(false)}
        >
          Anuluj
        </button>
        <button
          className="border border-[#6941C6] py-[10px] px-[14px] rounded-lg shadow-sm text-[#6941C6] font-semibold"
          onClick={handleSubmit}
        >
          Dodaj
        </button>
      </div>
    </div>
  );
}

export function EditMenuItemForm({
  setIsFormVisible,
  itemData,
}: {
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
  itemData: { id: string; name: string; link: string };
}) {
  const { handleUpdateItem } = useMenuActions();
  const [name, setName] = useState(itemData.name);
  const [link, setLink] = useState(itemData.link);

  const handleSubmit = () => {
    handleUpdateItem(itemData.id, { name, link });
    setIsFormVisible(false);
  };

  return (
    <div className="border rounded-lg pt-[20px] pl-[24px] pb-[20px] pr-[80px] flex flex-col gap-[20px] bg-white shadow-sm">
      <MenuForm
        name={name}
        link={link}
        onChangeName={(e) => setName(e.target.value)}
        onChangeLink={(e) => setLink(e.target.value)}
      />
      <div className="flex gap-[8px]">
        <button
          className="border border-[#D0D5DD] py-[10px] px-[14px] rounded-lg shadow-sm text-[#344054] font-semibold"
          onClick={() => setIsFormVisible(false)}
        >
          Anuluj
        </button>
        <button
          className="border border-[#6941C6] py-[10px] px-[14px] rounded-lg shadow-sm text-[#6941C6] font-semibold"
          onClick={handleSubmit}
        >
          Zaktualizuj
        </button>
      </div>
    </div>
  );
}

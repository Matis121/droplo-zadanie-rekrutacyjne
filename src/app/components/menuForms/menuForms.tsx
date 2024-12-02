import { useMenuActions } from "@/app/hooks/useMenuActions";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Image from "next/image";

export function AddMenuItemForm({
  parentId,
  setIsFormVisible,
}: {
  parentId: string | null;
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const { handleAddItem } = useMenuActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    handleAddItem(parentId, data.label, data.url);
    setIsFormVisible(false);
  };

  return (
    <div className="border rounded-lg pt-[20px] pl-[24px] pb-[20px] pr-[80px] flex flex-col gap-[20px] bg-white shadow-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[8px]"
      >
        <div className="flex flex-col gap-[6px]">
          <label
            htmlFor="label"
            className="text-sm font-medium color-[#344054]"
          >
            Nazwa
          </label>
          <input
            {...register("label", {
              required: "Nazwa jest wymagana",
              maxLength: {
                value: 80,
                message: "Nazwa nie może przekroczyć 80 znaków",
              },
            })}
            type="text"
            id="label"
            placeholder="np. Promocje"
            className="border shadow-sm py-[8px] px-[12px] rounded-lg"
          />
          {errors.label && (
            <span className="text-red-500">{`${errors.label.message}`}</span>
          )}
        </div>

        <div className="flex flex-col gap-[6px]">
          <label htmlFor="url" className="text-sm font-medium color-[#344054]">
            Link
          </label>
          <div className="relative">
            <input
              {...register("url", {
                maxLength: {
                  value: 300,
                  message: "Link nie może przekraczać 300 znaków",
                },
                pattern: {
                  value:
                    /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,6}(:\d+)?(\/[^\s]*)?$/,
                  message: "Podany adres url jest niepoprawny",
                },
              })}
              type="text"
              id="url"
              placeholder="Wklej lub wyszukaj"
              className="border shadow-sm py-[8px] px-[12px] rounded-lg pl-[40px] w-full"
            />
            <span className="absolute left-[10px] top-[50%] transform -translate-y-[50%] text-gray-400">
              <Image
                src="/search-icon.svg"
                alt="search icon"
                width={20}
                height={20}
              />
            </span>
          </div>
          {errors.url && (
            <span className="text-red-500">{`${errors.url.message}`}</span>
          )}
        </div>

        <div className="flex gap-[8px]">
          <button
            type="button"
            className="border border-[#D0D5DD] py-[10px] px-[14px] rounded-lg shadow-sm text-[#344054] font-semibold"
            onClick={() => setIsFormVisible(false)}
          >
            Anuluj
          </button>
          <button
            type="submit"
            className="border border-[#6941C6] py-[10px] px-[14px] rounded-lg shadow-sm text-[#6941C6] font-semibold"
            disabled={isSubmitting}
          >
            Dodaj
          </button>
        </div>
      </form>
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      label: itemData.name,
      url: itemData.link,
    },
  });

  const onSubmit = (data: FieldValues) => {
    handleUpdateItem(itemData.id, { name: data.label, link: data.url });
    setIsFormVisible(false);
  };

  return (
    <div className="border rounded-lg pt-[20px] pl-[24px] pb-[20px] pr-[80px] flex flex-col gap-[20px] bg-white shadow-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[8px]"
      >
        <div className="flex flex-col gap-[6px]">
          <label htmlFor="label" className="text-sm font-medium text-[#344054]">
            Nazwa
          </label>
          <input
            {...register("label", {
              required: "Nazwa jest wymagana",
              maxLength: {
                value: 80,
                message: "Nazwa nie może przekroczyć 80 znaków",
              },
            })}
            type="text"
            id="label"
            placeholder="np. Promocje"
            className="border shadow-sm py-[8px] px-[12px] rounded-lg"
          />
          {errors.label && (
            <span className="text-red-500">{`${errors.label.message}`}</span>
          )}
        </div>

        <div className="flex flex-col gap-[6px]">
          <label htmlFor="url" className="text-sm font-medium text-[#344054]">
            Link
          </label>
          <div className="relative">
            <input
              {...register("url", {
                maxLength: {
                  value: 300,
                  message: "Link nie może przekraczać 300 znaków",
                },
                pattern: {
                  value:
                    /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,6}(:\d+)?(\/[^\s]*)?$/,
                  message: "Podany adres url jest niepoprawny",
                },
              })}
              type="text"
              id="url"
              placeholder="Wklej lub wyszukaj"
              className="border shadow-sm py-[8px] px-[12px] rounded-lg pl-[40px] w-full"
            />
            <span className="absolute left-[10px] top-[50%] transform -translate-y-[50%] text-gray-400">
              <Image
                src="/search-icon.svg"
                alt="search icon"
                width={20}
                height={20}
              />
            </span>
          </div>
          {errors.url && (
            <span className="text-red-500">{`${errors.url.message}`}</span>
          )}
        </div>

        <div className="flex gap-[8px]">
          <button
            type="button"
            className="border border-[#D0D5DD] py-[10px] px-[14px] rounded-lg shadow-sm text-[#344054] font-semibold"
            onClick={() => setIsFormVisible(false)}
          >
            Anuluj
          </button>
          <button
            type="submit"
            className="border border-[#6941C6] py-[10px] px-[14px] rounded-lg shadow-sm text-[#6941C6] font-semibold"
            disabled={isSubmitting}
          >
            Zaktualizuj
          </button>
        </div>
      </form>
    </div>
  );
}

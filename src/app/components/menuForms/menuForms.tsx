import { useForm, FieldValues } from "react-hook-form";
import { useMenuActions } from "@/app/hooks/useMenuActions";
import {
  AddMenuItemProps,
  EditMenuItemProps,
  MenuItemFormProps,
} from "@/app/types/types";
import Image from "next/image";

const MenuItemForm = ({
  setIsFormVisible,
  parentId = null,
  itemId,
  defaultValues = {},
  isEditMode = false,
}: MenuItemFormProps) => {
  const { handleAddItem, handleUpdateItem, handleDeleteItem } =
    useMenuActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      label: defaultValues.label || "",
      url: defaultValues.url || "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    if (isEditMode && itemId) {
      handleUpdateItem(itemId, {
        name: data.label,
        link: data.url || "",
      });
    } else {
      handleAddItem(parentId, data.label, data.url || "");
    }
    setIsFormVisible(false);
  };

  return (
    <div className="rounded-lg pt-[20px] pl-[24px] pb-[20px] pr-[80px] flex flex-col gap-[20px] bg-white border border-[--border-color-primary] relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[20px]"
      >
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="label"
              className="text-sm font-medium text-[--text-secondary]"
            >
              Nazwa
            </label>
            <input
              type="text"
              id="label"
              {...register("label", {
                required: "Nazwa jest wymagana",
                maxLength: {
                  value: 80,
                  message: "Nazwa nie może przekroczyć 80 znaków",
                },
              })}
              placeholder="np. Promocje"
              className="border border-[--border-color-primary] shadow-xs py-[8px] px-[12px] rounded-lg text-base text-[--text-placeholder]"
            />
            {errors.label && (
              <span className="text-red-500">{errors.label.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="url"
              className="text-sm font-medium text-[--text-secondary]"
            >
              Link
            </label>
            <div className="relative">
              <input
                type="text"
                id="url"
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
                placeholder="Wklej lub wyszukaj"
                className="border border-[--border-color-primary] shadow-xs py-[8px] pl-[42px] pr-[12px] rounded-lg text-base text-[--text-placeholder] w-full"
              />
              <span className="absolute left-[12px] top-[50%] transform -translate-y-[50%] text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
            </div>
            {errors.url && (
              <span className="text-red-500">{errors.url.message}</span>
            )}
          </div>
        </div>
        <div className="flex gap-[8px]">
          <button
            type="button"
            className="border border-[--border-color-primary] py-[10px] px-[14px] rounded-lg shadow-xs text-[--text-secondary] text-sm font-semibold bg-white"
            onClick={() => setIsFormVisible(false)}
          >
            Anuluj
          </button>
          <button
            type="submit"
            className="border border-[--border-color-purple] py-[10px] px-[14px] rounded-lg shadow-xs text-[--text-purple] text-sm font-semibold bg-white"
            disabled={isSubmitting}
          >
            {isEditMode ? "Zaktualizuj" : "Dodaj"}
          </button>
        </div>
      </form>
      <button
        className=" absolute right-0 p-[10px] mr-[24px]"
        onClick={() => {
          if (isEditMode) {
            handleDeleteItem(itemId || "");
          }
          setIsFormVisible(false);
        }}
      >
        <Image src="/trash-icon.svg" alt="plus icon" width={20} height={20} />
      </button>
    </div>
  );
};

export const AddMenuItemForm = ({
  parentId,
  setIsFormVisible,
}: AddMenuItemProps) => (
  <MenuItemForm parentId={parentId} setIsFormVisible={setIsFormVisible} />
);

export const EditMenuItemForm = ({
  setIsFormVisible,
  itemData,
}: EditMenuItemProps) => (
  <MenuItemForm
    setIsFormVisible={setIsFormVisible}
    itemId={itemData.id}
    defaultValues={{
      label: itemData.name,
      url: itemData.link,
    }}
    isEditMode={true}
  />
);

export default MenuItemForm;

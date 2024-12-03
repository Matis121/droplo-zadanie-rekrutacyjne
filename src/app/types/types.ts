import { Dispatch, SetStateAction } from "react";

// Menu types
export type MenuItem = {
  id: string;
  name: string;
  link: string;
  subMenu?: MenuItem[];
};

export type MenuItemProps = {
  id: string;
  name: string;
  link: string;
  hasSubMenu: boolean | undefined;
};

// Form types
export type MenuItemFormProps = {
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
  parentId?: string | null;
  itemId?: string;
  defaultValues?: { label?: string; url?: string };
  isEditMode?: boolean;
};

export type AddMenuItemProps = {
  parentId: string | null;
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
};

export type EditMenuItemProps = {
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
  itemData: { id: string; name: string; link: string };
};

// Drag and drop
export type ItemAndParent = {
  item: any;
  parent: any[];
  parentIndex: number;
} | null;

import MenuItem from "../components/menuItem";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const renderMenu = (items: MenuItem[]) => {
  return items.map((item) => (
    <div key={item.id} className="mr-[-1px] ml-[-1px]">
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <MenuItem
          name={item.name}
          link={item.link}
          id={item.id}
          key={item.id}
          hasSubMenu={item.subMenu?.length !== 0}
        />
      </SortableContext>
      {item.subMenu && <div className="ml-16">{renderMenu(item.subMenu)}</div>}
    </div>
  ));
};

import MenuItem from "../components/menuItem";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const renderMenu = (items: MenuItem[]) => {
  return items.map((item) => (
    <div key={item.id}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <MenuItem
          name={item.name}
          link={item.link}
          id={item.id}
          key={item.id}
        />
      </SortableContext>
      {item.subMenu && <div className="ml-16">{renderMenu(item.subMenu)}</div>}
    </div>
  ));
};

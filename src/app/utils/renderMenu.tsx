import MenuItem from "../components/menuItem";

export const renderMenu = (items: MenuItem[]) => {
  return items.map((item) => (
    <div key={item.id}>
      <MenuItem name={item.name} link={item.link} id={item.id} />
      {item.subMenu && <div className="ml-16">{renderMenu(item.subMenu)}</div>}
    </div>
  ));
};

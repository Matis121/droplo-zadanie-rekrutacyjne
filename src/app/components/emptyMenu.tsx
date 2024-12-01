export default function EmptyMenu() {
  return (
    <div className="bg-[--bg-secondary] flex items-center justify-center flex-col gap-[24px] py-[24px] rounded-md border">
      <div className="flex items-center flex-col gap-1">
        <h2 className="font-semibold text-base">Menu jest puste</h2>
        <p>W tym menu nie ma jeszcze żadnych linków.</p>
      </div>
      <button className="font-semibold text-base text-white px-[14px] py-[10px] bg-[#7F56D9] rounded-md shadow-sm">
        Dodaj pozycję menu
      </button>
    </div>
  );
}

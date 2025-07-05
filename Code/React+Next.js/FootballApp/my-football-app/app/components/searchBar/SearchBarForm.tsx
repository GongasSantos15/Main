export default function SearchBarForm() {
  return (
    <div className="flex justify-center items-center w-full max-w-lg relative">
      <input
        type="text"
        placeholder="Search for a team"
        className="w-full bg-gray-300 text-black p-2 outline-none border-neutral-100/60 border-[2px] rounded-full
      hover:border-green-700 focus:border-green-700"
      />
    </div>
  );
}

// Imports
import { Team } from "@/types";
import getTeams from "@/app/util/getTeams";
import SearchBarForm from "./SearchBarForm";

export default async function SearchBar() {
  let teamsData: Team[] = await getTeams();

  return (
    <div className="flex justify-center items-center w-full p-3 bg-black/40 search-bar">
      <div className="w-1/6 flex justify-center items-center text-neutral-100">
        <a href={"/"} className="flex justify-center items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 object-cover rounded-full"
          />
          <div className="px-2 md:block hidden font-bold text-xl text-white">
            Footy
          </div>
        </a>
      </div>
      <div className="w-4/6 flex justify-center items-center">
        <SearchBarForm teamsData={teamsData} />
      </div>
      <div className="w-1/6"></div>
    </div>
  );
}

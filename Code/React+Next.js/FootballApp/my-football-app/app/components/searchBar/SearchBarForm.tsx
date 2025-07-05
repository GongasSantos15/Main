// Imports
"use client";
import { Team } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBarForm({ teamsData }: { teamsData: Team[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showFilteredBox, setShowFilteredBox] = useState(false);

  let router = useRouter();

  const filteredTeams = teamsData.filter((team) =>
    team.team.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setFocusedIndex(-1);
    setShowFilteredBox(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const length = Math.min(filteredTeams.length, 10);
      setFocusedIndex((prevIndex) =>
        prevIndex < length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (event.key === "Enter" && focusedIndex !== -1) {
      event.preventDefault();
      const teamId = filteredTeams[focusedIndex].team.id;
      router.push(`/team/${teamId}`);
      setSearchTerm("");
    }
  };

  const handleTeamItemClick = () => {
    setSearchTerm("");
  };

  return (
    <div className="flex justify-center items-center w-full max-w-lg relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a team"
        className="w-full bg-gray-300 text-black p-2 outline-none border-neutral-100/60 border-[2px] rounded-full
      hover:border-green-700 focus:border-green-700"
      />
      {searchTerm && filteredTeams.length > 0 && showFilteredBox ? (
        <div className="absolute top-full left-2 w-full max-w-md bg-black/80 z-20 flex flex-col">
          {filteredTeams.slice(0, 10).map((standing, i) => (
            <Link
              href={`/team/${standing.team.id}`}
              key={standing.team.id}
              className={`p-2 text-neutral-100 ${i === focusedIndex ? "bg-neutral-100/40" : ""}`}
              onClick={() => handleTeamItemClick()}
            ></Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

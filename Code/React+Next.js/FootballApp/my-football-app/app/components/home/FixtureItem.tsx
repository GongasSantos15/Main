"use client";

import { Fixture } from "@/types";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

type PageProps = {
  match: Fixture;
  index: number;
};

export default function FixtureItem({ match, index }: PageProps) {
  const today = moment();
  const matchDate = moment(match.fixture.date);

  return today.isBefore(matchDate) ? (
    <Link
      href={`/match/${match.fixture.id}`}
      key={match.fixture.id}
      className={`flex w-full p-2 justify-center items-center h-36 hover:bg-red-800/50
        ${index % 2 === 0 ? "bg-black/40" : ""} animated-div`}
    >
      {/* Home Team */}
      <div className="w-1/3 flex flex-col justify-center items-center text-center">
        <div className="w-12 h-12 flex items-center justify-center">
          <Image
            src={match.teams.home.logo}
            alt="Home Team Logo"
            width={70}
            height={70}
            className="object-contain max-w-full max-h-full"
          />
        </div>
        <p className="text-xs mt-1 truncate w-full">{match.teams.home.name}</p>
      </div>

      {/* Match Info */}
      <div className="w-1/3 flex flex-col justify-center items-center text-center">
        <p className="text-xs text-gray-300">{matchDate.format("MMM DD")}</p>
        <p className="text-xs text-gray-300">{matchDate.format("HH:mm")}</p>
        <p className="text-xs font-bold text-white mt-1">
          {match.fixture.status.short === "NS"
            ? "VS"
            : `${match.goals.home} - ${match.goals.away}`}
        </p>
      </div>

      {/* Away Team */}
      <div className="w-1/3 flex flex-col justify-center items-center text-center">
        <div className="w-12 h-12 flex items-center justify-center">
          <Image
            src={match.teams.away.logo}
            alt="Away Team Logo"
            width={70}
            height={70}
            className="object-contain max-w-full max-h-full"
          />
        </div>
        <p className="text-xs mt-1 truncate w-full">{match.teams.away.name}</p>
      </div>
    </Link>
  ) : null;
}

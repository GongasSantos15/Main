"use client";

// Imports
import { Fixture } from "@/types";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import LocalTime from "@/app/components/LocalTime";

// Tipos das Props
type PageProps = {
  match: Fixture;
  index: number;
};

// Define o componente FixtureItem que recebe a partida e o seu índice como Props
export default function FixtureItem({ match, index }: PageProps) {
  const today = moment();
  const matchDate = moment(match.fixture.date);

  // Verifica se a data atual é anterior à data da partida
  return today.isBefore(matchDate) ? (
    <Link
      href={`/match/${match.fixture.id}`}
      key={match.fixture.id}
      className={`flex w-full p-2 justify-center items-center h-36 hover:bg-red-800/50
        ${index % 2 === 0 ? "bg-black/40" : ""} animated-div`}
    >
      {/* Equipa Local */}
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
        {/* Exibe o nome da equipa de casa */}
        <p className="text-xs mt-1 truncate w-full">{match.teams.home.name}</p>
      </div>

      {/* Informações do Jogo */}
      <div className="w-1/3 flex flex-col justify-center items-center text-center">
        <div className="h-1/3 text-xs text-center">
          <LocalTime fixture={match} />
        </div>
        <div className="h-1/3 text-center">vs</div>
        <div className="h-1/3"></div>
      </div>

      {/* Equipa Visitante */}
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
        {/* Exibe o nome da equipa visitante */}
        <p className="text-xs mt-1 truncate w-full">{match.teams.away.name}</p>
      </div>
    </Link>
  ) : null;
}

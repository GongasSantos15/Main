// Includes
import getTeamInfoByTeamId from "@/app/util/getTeamInfoByTeamId";
import { Fixture, Team } from "@/types";
import Image from "next/image";
import Fixtures from "./components/Fixtures";
import getFixturesByTeamId from "@/app/util/getFixturesByTeamId";

// Definir o tipo de parâmetros da página
type PageProps = {
  params: {
    id: string;
  };
};

// Função que define e exporta um componente TeamPage que recebe as propriedades conforme definido em PageProps
export default async function TeamPage({ params }: PageProps) {
  let teamInfo: Team | undefined = await getTeamInfoByTeamId(
    parseInt(params.id),
  );
  let fixturesByTeamId: Fixture[] = await getFixturesByTeamId(
    parseInt(params.id),
  );

  // Se não existir informações da equipa, exibir uma mensagem
  if (!teamInfo) {
    return (
      <div className="flex w-full justify-center items-center py-5">
        <div className="flex max-w-7xl p-5 w-full md:flex-row justify-center items-center text-neutral-100">
          Team Info Not Available
        </div>
      </div>
    );
  }

  return (
    // Container flexivel para centralizar o conteúdo
    <div className="flex justify-center items-center text-neutral-100 py-5">
      <div className="flex flex-col max-w-7xl p-5 w-full md:flex-row">
        {/* Container que contém as informações da equipa */}
        <div className="flex flex-col md:w-1/3 justify-center items-center bg-gradient-to-r from-black/60 to-red-800/80 h-[500px]">
          <Image
            src={teamInfo.team.logo}
            alt="TeamLogo"
            width={150}
            height={150}
            className="p-3"
          />
          {/* Nome da equipa */}
          <div className="text-2xl">{teamInfo.team.name}</div>
          <div className="flex justify-center items-center w-full">
            {/* Classificação na liga, Nome da Liga e Forma recente (últimas 5 partidas) */}
            <div className="w-1/3 text-center text-2xl">#{teamInfo.rank}</div>
            <div className="w-1/3 text-center">{teamInfo.group}</div>
            <div className="w-1/3 flex-col justify-center items-center">
              <div className="text-center">Form</div>
              {/* Indicadores visuais da forma da equipa */}
              <div className="flex justify-center items-center">
                {teamInfo?.form.split("").map((char, i) => (
                  <div
                    key={char + i}
                    className={`opacity-80 w-3 h-3 m-1 rounded-full ${char === "W" ? "bg-green-500" : char === "D" ? "bg-gray-500" : "bg-red-500"}`}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Estatísticas de desempenho da equipa */}
          <div className="flex flex-col w-full p-2 mt-10">
            <div className="flex w-full justify-center items-center text-xl">
              <div className="w-full text-center font-bold">P</div>
              <div className="w-full text-center">M</div>
              <div className="w-full text-center">W</div>
              <div className="w-full text-center">D</div>
              <div className="w-full text-center">L</div>
              <div className="w-full text-center">GF</div>
              <div className="w-full text-center">GA</div>
              <div className="w-full text-center">GD</div>
            </div>
            <div className="flex w-full justify-center items-center text-xl">
              <div className="w-full text-center font-bold">
                {teamInfo.points}
              </div>
              <div className="w-full text-center">{teamInfo.all.played}</div>
              <div className="w-full text-center">{teamInfo.all.win}</div>
              <div className="w-full text-center">{teamInfo.all.draw}</div>
              <div className="w-full text-center">{teamInfo.all.lose}</div>
              <div className="w-full text-center">{teamInfo.all.goals.for}</div>
              <div className="w-full text-center">
                {teamInfo.all.goals.against}
              </div>
              <div className="w-full text-center">{teamInfo.goalsDiff}</div>
            </div>
          </div>
        </div>
        {/* Container de partidas da equipa */}
        <div className="flex flex-col md:w-2/3 justify-center items-center">
          <Fixtures
            fixturesByTeamId={fixturesByTeamId}
            teamId={parseInt(params.id)}
          />
        </div>
      </div>
    </div>
  );
}

import getFixturesByFixtureId from "@/app/util/getFixturesByFixtureId";
import { Fixture } from "@/types";
import Link from "next/link";
import Image from "next/image";
import LocalTime from "@/app/components/LocalTime";

// Tipo dos parametros
type PageProps = {
  params: {
    id: string;
  };
};

// Função que define e exporta um componente Match que recebe as propriedades conforme definido em PageProps
export default async function Match({ params }: PageProps) {
  let fixtureByFixtureId: Fixture | undefined = await getFixturesByFixtureId(
    parseInt(params.id),
  );

  // Se não houver dados de nenhuma partida, exibe uma mensagem
  if (!fixtureByFixtureId) {
    return (
      <div className="flex w-full justify-center items-center py-5">
        <div className="flex max-w-7xl p-5 w-full md:flex-row justify-center items-center text-neutral-100">
          No Fixture Info Available
        </div>
      </div>
    );
  }

  // Se houver dados da partida, renderiza os detalhes da partida
  return (
    <div className="flex flex-col w-full justify-center items-center py-10 md:p-10 text-neutral-100">
      {/* Container Principal para exibir os logos e informações da partida */}
      <div className="flex w-full max-w-7xl items-center justify-center perspective pb-10 md:pb-20">
        {/* Container para o logo da equipa da casa */}
        <div className="w-1/3 flex justify-center rounded-full animate-logo-pop-left logo-shadow">
          <Link href={`../team/${fixtureByFixtureId.teams.home.id}`}>
            <div className="w-64 h-64 flex items-center justify-center">
              <Image
                src={fixtureByFixtureId.teams.home.logo}
                alt="HomeLogoMatch"
                width={250}
                height={250}
                className="object-contain max-w-full max-h-full"
              />
            </div>
          </Link>
        </div>

        {/* Container para exibir o resultado da partida */}
        <div className="w-1/3 flex-justify-center items-center flex-col h-56">
          <div className="h-1/5 flex justify-center items-center text-sm md:text-xl text-center">
            <LocalTime fixture={fixtureByFixtureId} />
          </div>
          <div className="h-3/5 flex justify-center items-center md:text-5xl text-2xl">
            <div className="flex flex-col justify-center items-center">
              {fixtureByFixtureId.score.fulltime.home}

              {/* Exibir o tempo extra e penalidades da equipa da casa, se disponível */}
              {fixtureByFixtureId.score.penalty.home !== null ? (
                <div className="flex flex-col justify-center items-center text-sm">
                  <div>(et. {fixtureByFixtureId.score.extratime.home})</div>
                  <div>(pen. {fixtureByFixtureId.score.penalty.home})</div>
                </div>
              ) : fixtureByFixtureId.score.extratime.home !== null ? (
                <div className="text-sm">
                  (et. {fixtureByFixtureId.score.extratime.home})
                </div>
              ) : null}
            </div>
            <div>-</div>
            <div className="flex flex-col justify-center items-center">
              {fixtureByFixtureId.score.fulltime.away}

              {/* Exibir o tempo extra e penalidades da equipa visitante, se disponível */}
              {fixtureByFixtureId.score.penalty.away !== null ? (
                <div className="flex flex-col justify-center items-center text-sm">
                  <div>(et. {fixtureByFixtureId.score.extratime.away})</div>
                  <div>(pen. {fixtureByFixtureId.score.penalty.away})</div>
                </div>
              ) : fixtureByFixtureId.score.extratime.away !== null ? (
                <div className="text-sm">
                  (et. {fixtureByFixtureId.score.extratime.away})
                </div>
              ) : null}
            </div>
          </div>
          <div className="h-1/5 flex justify-center items-center"></div>
        </div>

        {/* Container para o logo da equipa visitante */}
        <div className="w-1/3 flex-justify-center rounded-full animate-logo-pop-right logo-shadow">
          <Link href={`../team/${fixtureByFixtureId.teams.away.id}`}>
            <div className="w-64 h-64 flex items-center justify-center">
              <Image
                src={fixtureByFixtureId.teams.away.logo}
                alt="AwayLogoMatch"
                width={250}
                height={250}
                className="object-contain max-w-full max-h-full"
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Container para exibir os nomes das equipas, assim como o nome da liga, do estádio e da jornada que foi a partida */}
      <div className="flex flex-col w-full justify-center items-center py-5 md:p-10 bg-gradient-to-b from-red-800/60 to-red-800/10">
        <div className="flex flex-col justify-center items-center py-2">
          <div>{fixtureByFixtureId.league.name}</div>
          <div>{fixtureByFixtureId.league.round} J</div>
        </div>
        <div className="flex jusitfy-center items-center w-full">
          <div className="flex flex-col w-1/2 justify-center items-center p-1">
            <div className="text-xl md:text-2xl text-center">
              {fixtureByFixtureId.teams.home.name}
            </div>
          </div>
          <div className="flex flex-col w-1/2 justify-center items-center p-1">
            <div className="text-xl md:text-2xl text-center">
              {fixtureByFixtureId.teams.away.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

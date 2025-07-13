"use client";

// Imports
import { Standing, Team } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Define e exporta um componente que recebe as propriedades standingsData e filteredFixtures
export default function Standings({
  standingsData,
}: {
  standingsData: Standing[];
}) {
  // Nomes das ligas da UEFA que queremos exibir
  const leagueNames = [
    "Premier League",
    "La Liga",
    "Bundesliga",
    "Ligue 1",
    "Serie A",
    "Primeira Liga",
  ];

  // Filtra os dados de classificação para incluir apenas as ligas desejadas
  // Agora standingsData tem a garantia de ser uma array, mesmo que vazia.
  const filteredStandings = standingsData.filter((data) =>
    leagueNames.includes(data.league.name),
  );

  // Cria o array de abas apenas com as ligas filtradas
  const leagueTabs = filteredStandings.map((data) => ({
    name: data.league.name,
    logo: data.league.logo,
    id: data.league.id,
  }));

  // Estados Locais para gerir a aba ativa
  const [activeTab, setActiveTab] = useState(0);

  // Cria uma referência para o elemento do menu
  const menuRef = useRef<HTMLDivElement>(null);

  // Função para aceder a uma aba específica, sem scroll vertical
  const scrollToTab = (index: number) => {
    const container = menuRef.current;
    if (container) {
      const tab = container.children[index] as HTMLElement;
      if (tab) {
        container.scrollTo({
          left: tab.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  };

  // Função para lidar com os cliques nas abas
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    scrollToTab(index);
  };

  // Event Listener para lidar com eventos de scroll do rato
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.shiftKey) {
        event.preventDefault();
      }
    };

    const container = menuRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    // Remove o Event Listener quando o componente é desmontado
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  // useEffect para rolar para a aba ativa quando activeTab muda
  // Isso garante que, mesmo que o estado inicial seja 0, a rolagem aconteça se necessário
  useEffect(() => {
    scrollToTab(activeTab);
  }, [activeTab]);

  return (
    // Container principal com layout flexível
    <div className="flex flex-col w-full max-w-7xl">
      {/* Container para a secção das classificações */}
      <div className="flex justify-center items-center w-full p-10">
        <div
          className="flex flex-col justify-center items-center bg-gradient-to-b
                from-black/40 w-full text-neutral-100 rounded-3xl"
        >
          <div className="w-full flex flex-col justify-center items-center">
            {/* Container para os botões das abas das diferentes ligas */}
            <div className="flex justify-center w-full">
              {leagueTabs.map((league, i) => (
                <button
                  key={league.id}
                  className={`w-full p-4 rounded-t-lg md:text-base text-xs font-bold
                  ${
                    i === activeTab
                      ? "text-neutral-100"
                      : "text-gray-400 bg-black/80"
                  }`}
                  onClick={() => handleTabClick(i)}
                >
                  <div className="flex items-center justify-center gap-2">
                    {" "}
                    {/* Flexbox para alinhar logo e nome */}
                    {league.logo && (
                      <Image
                        src={league.logo}
                        alt={`${league.name} Logo`}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    )}
                    <span>{league.name}</span>
                  </div>
                </button>
              ))}
            </div>
            {/* Container para os dados de classificação roláveis */}
            <div
              ref={menuRef}
              className="w-full flex overflow-x-hidden snap-x scrollbar-none scroll-smooth text-xs md:text-sm"
            >
              {filteredStandings.map((responseData, i) => (
                <div
                  key={responseData.league.id}
                  className="flex-shrink-0 w-full snap-center flex justify-center items-center"
                >
                  <div className="flex flex-col p-2 w-full min-h-[750px]">
                    {/* Cabeçalho da tabela de classificações */}
                    <div className="flex w-full p-1">
                      <div className="w-1/12"></div>
                      <div className="w-1/12"></div>
                      <div className="w-3/12"></div>
                      <div className="w-6/12 flex justify-evenly">
                        <div className="w-full text-center">M</div>
                        <div className="w-full text-center">W</div>
                        <div className="w-full text-center">D</div>
                        <div className="w-full text-center">L</div>
                        <div className="w-full text-center font-bold">P</div>
                        <div className="w-full text-center">GF</div>
                        <div className="w-full text-center">GA</div>
                        <div className="w-full text-center">GD</div>
                      </div>
                      <div className="w-2/12 text-center">Form</div>
                    </div>
                    {/* Este div vai crescer e conter as equipas. Mapeia e renderiza os dados das equipas, a classificação geral */}
                    <div className="flex flex-col flex-grow">
                      {responseData.league.standings[0].map(
                        (team: Team, j: number) => (
                          <Link
                            href={`/team/${team.team.id}`}
                            key={j + team.team.name}
                            className={`flex w-full p-1 hover:bg-green-700/50 ${j % 2 === 0 ? "bg-black/50" : ""}`}
                          >
                            <div className="w-1/12 flex px-2 justify-center items-center">
                              {j + 1}
                            </div>
                            <div className="w-1/12 flex px-2 justify-center items-center">
                              <Image
                                src={team.team.logo}
                                alt="Team Logo"
                                width={25}
                                height={25}
                                className="w-6 h-6 object-contain"
                              />
                            </div>
                            <div className="w-3/12 flex text-xs items-center">
                              {team.team.name}
                            </div>
                            <div className="w-6/12 flex justify-center items-center">
                              <div className="w-full text-center">
                                {team.all.played}
                              </div>
                              <div className="w-full text-center">
                                {team.all.win}
                              </div>
                              <div className="w-full text-center">
                                {team.all.draw}
                              </div>
                              <div className="w-full text-center">
                                {team.all.lose}
                              </div>
                              <div className="w-full text-center font-bold">
                                {team.points}
                              </div>
                              <div className="w-full text-center">
                                {team.all.goals.for}
                              </div>
                              <div className="w-full text-center">
                                {team.all.goals.against}
                              </div>
                              <div className="w-full text-center">
                                {team.goalsDiff}
                              </div>
                            </div>
                            {/* Renderiza a forma recente da equipa com bolas coloridas: verde 'W', vermelho 'L', cinza 'D' */}
                            <div className="w-2/12 flex justify-center items-center">
                              {team.form
                                ?.split("")
                                .map((char: string, i: number) => (
                                  <div
                                    key={char + i}
                                    className={`opacity-80 w-3 h-3 m-[1px] rounded-full
                              ${
                                char === "L"
                                  ? "bg-red-500"
                                  : char === "D"
                                    ? "bg-gray-500"
                                    : "bg-green-500"
                              }`}
                                  />
                                ))}
                            </div>
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

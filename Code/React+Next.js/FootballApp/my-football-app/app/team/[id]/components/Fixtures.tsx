"use client";

// Imports
import LocalTime from "@/app/components/LocalTime";
import { Fixture } from "@/types";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Tipos de parâmetros
type PageProps = {
  fixturesByTeamId: Fixture[];
  teamId: number;
};

// Componente para exibir as partidas de uma equipa
export default function Fixtures({ fixturesByTeamId, teamId }: PageProps) {
  // Estados para controlar o índice atual, a página, quantas partidas por página e a data atual formatada
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const today = moment().format("YYYY-MM-DD");

  // Filtra as partidas que já ocorreram
  const fixturesDone = fixturesByTeamId.filter((fixture) => {
    const fixtureDate = moment(fixture.fixture.date).format("YYYY-MM-DD");
    return fixtureDate < today;
  });

  // Filtra as partidas que ocorrem hoje
  const fixturesToday = fixturesByTeamId.filter((fixture) => {
    const fixtureDate = moment(fixture.fixture.date).format("YYYY-MM-DD");
    return fixtureDate === today;
  });

  // Filtra as próximas partidas
  const fixturesFuture = fixturesByTeamId.filter((fixture) => {
    const fixtureDate = moment(fixture.fixture.date).format("YYYY-MM-DD");
    return fixtureDate > today;
  });

  // Apresenta as primeiras 40 partidas futuras
  const firstItemsFixturesFuture = fixturesFuture.slice(0, 40);

  // Função para navegar para a partida anterior
  const prevItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  // Função para navegar para a próxima partida
  const nextItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === firstItemsFixturesFuture.length - 1
        ? firstItemsFixturesFuture.length - 1
        : prevIndex + 1,
    );
  };

  // Função para calcular a posição para a animação de transição entre partidas
  const getTranslateX = (index: number) => {
    return `-${index * 100}%`;
  };

  // Inverte a ordem das partidas concluídas
  const reversedFixturesDoneData = [...fixturesDone].reverse();

  // Lógica de paginação, no fim das partidas concluídas
  const totalPages = Math.ceil(reversedFixturesDoneData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFixtures = reversedFixturesDoneData.slice(startIndex, endIndex);

  // Função para mudar de página
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Função para renderizar os botões de paginação
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Botão "Anterior"
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 mx-1 rounded-lg border transition-all duration-200 ${
          currentPage === 1
            ? "bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-gray-800 to-gray-900 text-neutral-100 border-gray-600 hover:from-red-800 hover:to-red-700 hover:border-red-500"
        }`}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>,
    );

    // Primeira página se não estiver visível
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 mx-1 rounded-lg border bg-gradient-to-r from-gray-800 to-gray-900 text-neutral-100 border-gray-600 hover:from-red-800 hover:to-red-700 hover:border-red-500 transition-all duration-200"
        >
          1
        </button>,
      );

      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-3 py-2 mx-1 text-gray-400">
            ...
          </span>,
        );
      }
    }

    // Páginas visíveis
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 rounded-lg border transition-all duration-200 ${
            currentPage === i
              ? "bg-gradient-to-r from-red-800 to-red-700 text-white border-red-500 shadow-lg"
              : "bg-gradient-to-r from-gray-800 to-gray-900 text-neutral-100 border-gray-600 hover:from-red-800 hover:to-red-700 hover:border-red-500"
          }`}
        >
          {i}
        </button>,
      );
    }

    // Última página se não estiver visível
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-3 py-2 mx-1 text-gray-400">
            ...
          </span>,
        );
      }

      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 mx-1 rounded-lg border bg-gradient-to-r from-gray-800 to-gray-900 text-neutral-100 border-gray-600 hover:from-red-800 hover:to-red-700 hover:border-red-500 transition-all duration-200"
        >
          {totalPages}
        </button>,
      );
    }

    // Botão "Próximo"
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 mx-1 rounded-lg border transition-all duration-200 ${
          currentPage === totalPages
            ? "bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-gray-800 to-gray-900 text-neutral-100 border-gray-600 hover:from-red-800 hover:to-red-700 hover:border-red-500"
        }`}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>,
    );

    return buttons;
  };

  return (
    <div className="flex flex-col w-full justify-center items-center text-neutral-100">
      {/* Container das partidas futuras */}
      <div className="flex flex-col w-full justify-center items-center">
        <div
          className="flex w-full justify-center items-center p-2 bg-gradient-to-r
                from-red-800/80 to-red-800/30"
        >
          Upcoming Matches
        </div>
        <div className="flex items-center justify-center relative overflow-hidden w-full">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 z-10"
            onClick={prevItem}
          >
            {/* Ícone de seta para a esquerda que ao clicar permite exibir a partida anterior */}
            <ChevronDoubleLeftIcon
              className={`h-10 w-10 ${currentIndex === 0 ? "text-gray-600" : "text-neutral-100"}`}
            />
          </button>
          <div
            className="flex transition-transform duration-500 w-full"
            style={{ transform: `translateX(${getTranslateX(currentIndex)})` }}
          >
            {firstItemsFixturesFuture.map((fixture, i) => (
              <Link
                href={`/match/${fixture.fixture.id}`}
                key={fixture.fixture.id}
                className="w-full flex-shrink-0 flex text-neutral-100 items-center h-36
                                    bg-gradient-to-r from-black/90 to-black/40 hover:bg-red-800"
              >
                {/* Informações da partida */}
                <div className="flex flex-col justify-center items-center w-3/12 text-sm text-center">
                  <div className="w-20 h-17 flex items-center justify-center">
                    <Image
                      src={fixture.teams.home.logo}
                      alt="HomeLogo"
                      width={70}
                      height={70}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                  <div className="text-center">{fixture.teams.home.name}</div>
                </div>
                <div className="flex flex-col justify-center items-center w-1/2">
                  <div className="h-1/6 text-center text-[8px] md:text-xs">
                    {fixture.league.name}
                  </div>
                  <div className="h-1/6 text-center text-[8px] md:text-xs">
                    <LocalTime fixture={fixture} />
                  </div>
                  <div className="flex w-full justify-between items-center h-2/6 md:text-2xl">
                    <div className="flex flex-col justify-center items-center">
                      {fixture.score.penalty.home !== null ? (
                        <div
                          className="flex flex-col justify-center items-center
                                                    md:text-xs text-[8px]"
                        >
                          <div>(et. ){fixture.score.extratime.home}</div>
                          <div>(pen.){fixture.score.penalty.home}</div>
                        </div>
                      ) : fixture.score.extratime.home !== null ? (
                        <div className="text-sm">
                          (et. ) {fixture.score.extratime.home}
                        </div>
                      ) : null}
                    </div>
                    <div>-</div>
                    <div className="flex flex-col justify-center items-center">
                      {fixture.score.penalty.away !== null ? (
                        <div
                          className="flex flex-col justify-center items-center
                                                    md:text-xs text-[8px]"
                        >
                          <div>(et. ){fixture.score.extratime.away}</div>
                          <div>(pen.){fixture.score.penalty.away}</div>
                        </div>
                      ) : fixture.score.extratime.away !== null ? (
                        <div className="text-sm">
                          (et. ) {fixture.score.extratime.away}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="h-1/6 text-center text-[8px] md:text-xs">
                    {fixture.fixture.venue.name}
                  </div>
                  <div className="h-1/6 text-center text-[8px] md:text-xs"></div>
                </div>
                <div className="flex flex-col justify-center items-center w-3/12 text-sm text-center">
                  <div className="w-20 h-17 flex items-center justify-center">
                    <Image
                      src={fixture.teams.away.logo}
                      alt="AwayLogo"
                      width={70}
                      height={70}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                  <div className="text-center">{fixture.teams.away.name}</div>
                </div>
              </Link>
            ))}
          </div>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 z-10"
            onClick={nextItem}
          >
            {/* Ícone de seta para a direita que ao clicar permite exibir a próxima partida */}
            <ChevronDoubleRightIcon
              className={`h-10 w-10 ${currentIndex === firstItemsFixturesFuture.length - 1 ? "text-gray-600" : "text-neutral-100"}`}
            />
          </button>
        </div>
      </div>
      {/* Container do resultado das partidas */}
      <div className="flex flex-col w-full justify-center items-center">
        <div
          className="flex w-full justify-center items-center p-2 bg-gradient-to-r
                from-red-800/80 to-red-800/30"
        >
          Match Results
        </div>

        {/* Informações da paginação */}
        {reversedFixturesDoneData.length > 0 && (
          <div className="flex justify-between items-center w-full p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 text-sm text-gray-300">
            <div>
              Showing {startIndex + 1}-
              {Math.min(endIndex, reversedFixturesDoneData.length)} of{" "}
              {reversedFixturesDoneData.length} results
            </div>
            <div>
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}

        {/* Lista de resultados */}
        {currentFixtures.map((fixture, i) => (
          <div
            key={i}
            className="flex w-full text-neutral-100 items-center h-36
                        bg-gradient-to-r from-black/90 to-black/40 hover:bg-red-800"
          >
            <Link
              href={`/match/${fixture.fixture.id}`}
              key={fixture.fixture.id}
              className="w-full flex text-neutral-100 items-center h-36
                                    bg-gradient-to-r from-black/90 to-black/40 hover:bg-red-800"
            >
              {/* Container para as informações da partida */}
              <div className="flex flex-col justify-center items-center w-3/12 text-sm text-center">
                <div className="w-20 h-17 flex items-center justify-center">
                  <Image
                    src={fixture.teams.home.logo}
                    alt="HomeLogo"
                    width={70}
                    height={70}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
                <div className="text-center">{fixture.teams.home.name}</div>
              </div>
              <div className="flex flex-col justify-center items-center w-1/2">
                <div className="h-1/6 text-center text-[8px] md:text-xs">
                  {fixture.league.name}
                </div>
                <div className="h-1/6 text-center text-[8px] md:text-xs">
                  <LocalTime fixture={fixture} />
                </div>
                <div className="flex w-full justify-between items-center h-2/6 md:text-2xl">
                  <div className="flex flex-col justify-center items-center">
                    {fixture.score.fulltime.home}
                    {fixture.score.penalty.home !== null ? (
                      <div
                        className="flex flex-col justify-center items-center
                                                    md:text-xs text-[8px]"
                      >
                        <div>(et. ){fixture.score.extratime.home}</div>
                        <div>(pen.){fixture.score.penalty.home}</div>
                      </div>
                    ) : fixture.score.extratime.home !== null ? (
                      <div className="text-sm">
                        (et. ) {fixture.score.extratime.home}
                      </div>
                    ) : null}
                  </div>
                  <div>-</div>
                  <div className="flex flex-col justify-center items-center">
                    {fixture.score.fulltime.away}
                    {fixture.score.penalty.away !== null ? (
                      <div
                        className="flex flex-col justify-center items-center
                                                    md:text-xs text-[8px]"
                      >
                        <div>(et. ){fixture.score.extratime.away}</div>
                        <div>(pen.){fixture.score.penalty.away}</div>
                      </div>
                    ) : fixture.score.extratime.away !== null ? (
                      <div className="text-sm">
                        (et. ) {fixture.score.extratime.away}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="h-1/6 text-center text-[8px] md:text-xs">
                  {fixture.fixture.venue.name}
                </div>
                <div className="h-1/6 text-center text-[8px] md:text-xs"></div>
              </div>
              <div className="flex flex-col justify-center items-center w-3/12 text-sm text-center">
                <div className="w-20 h-17 flex items-center justify-center">
                  <Image
                    src={fixture.teams.away.logo}
                    alt="AwayLogo"
                    width={70}
                    height={70}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
                <div className="text-center">{fixture.teams.away.name}</div>
              </div>
            </Link>
            <div
              className={`w-[2%] h-full
                                ${
                                  !fixture.teams.home.winner &&
                                  !fixture.teams.away.winner
                                    ? "bg-slate-600"
                                    : (fixture.teams.home.winner &&
                                          fixture.teams.home.id === teamId) ||
                                        (fixture.teams.away.winner &&
                                          fixture.teams.away.id === teamId)
                                      ? "bg-green-600"
                                      : "bg-red-600"
                                }`}
            ></div>
          </div>
        ))}

        {/* Controlos da paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center p-6 bg-gradient-to-r from-gray-900/30 to-gray-800/30 w-full">
            <div className="flex items-center">{renderPaginationButtons()}</div>
          </div>
        )}

        {/* Mensagem quando não há resultados */}
        {reversedFixturesDoneData.length === 0 && (
          <div className="flex justify-center items-center p-8 text-gray-400">
            No match results available.
          </div>
        )}
      </div>
    </div>
  );
}

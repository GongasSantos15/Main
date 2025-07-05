// Imports
import Image from "next/image";
import { AllFixtures, Standing } from "@/types";
import getStandings from "./util/getStandings";
import StandingsAndFixtures from "./components/home/StandingsAndFixtures";
import getFixturesForFiveLeagues from "./util/getFixturesForFiveLeagues";

// Função que define e exporta um componente Home
export default async function Home() {
  // Procura os dados de classificação usando a função `getStandings`
  const standingsData: Standing[] = await getStandings();
  const filteredFixtures: AllFixtures[] = await getFixturesForFiveLeagues();

  return (
    // Container flexível que centraliza os itens, com preenchimento interno
    <div className="flex flex-col w-full justify-center items-center md:p-10">
      {/* Renderiza o componente `StandingsAndFixtures` e passa os dados de classificações como propriedade */}
      <StandingsAndFixtures
        standingsData={standingsData}
        filteredFixtures={filteredFixtures}
      />
    </div>
  );
}

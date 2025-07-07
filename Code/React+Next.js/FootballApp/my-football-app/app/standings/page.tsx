// Imports
import Standings from "../components/home/Standings";
import { AllFixtures, Standing } from "@/types";
import getStandings from "../util/getStandings";
import getFixturesForFiveLeagues from "../util/getFixturesForFiveLeagues";

export default async function StandingsPage() {
  // Procura os dados de classificação usando a função `getStandings`
  const standingsData: Standing[] = await getStandings();
  const filteredFixtures: AllFixtures[] = await getFixturesForFiveLeagues();

  return (
    <div className="flex flex-col w-full justify-center items-center md:p-10">
      {/* Renderiza o componente `StandingsAndFixtures` e passa os dados de classificações como propriedade */}
      <Standings standingsData={standingsData} />
    </div>
  );
}

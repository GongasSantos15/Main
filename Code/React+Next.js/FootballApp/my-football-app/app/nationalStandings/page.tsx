// Imports
import Standings from "../components/standings/Standings";
import { Standing } from "@/types";
import getStandings from "../util/getStandings";

export default async function StandingsPage() {
  // Procura os dados de classificação usando a função `getStandings`
  const standingsData: Standing[] = await getStandings();

  return (
    <div className="flex flex-col w-full justify-center items-center md:p-10">
      {/* Renderiza o componente `StandingsAndFixtures` e passa os dados de classificações como propriedade */}
      <Standings standingsData={standingsData} />
    </div>
  );
}

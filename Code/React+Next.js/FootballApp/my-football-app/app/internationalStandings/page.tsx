// Imports
import { Standing } from "@/types";
import getStandings from "../util/getStandings";
import UefaStandings from "../components/standings/UefaStandings";

export default async function StandingsPage() {
  // Procura os dados de classificação usando a função `getStandings`
  const standingsData: Standing[] = await getStandings();

  return (
    <div className="flex flex-col w-full justify-center items-center md:p-10">
      {/* Renderiza o componente `StandingsAndFixtures` e passa os dados de classificações como propriedade */}
      <UefaStandings standingsData={standingsData} />
    </div>
  );
}

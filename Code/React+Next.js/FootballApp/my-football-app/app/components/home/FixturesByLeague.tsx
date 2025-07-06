// Imports
import FixtureItem from "./FixtureItem";
import { Fixture } from "@/types";

// Definir os tipos dos parâmetros
type PageProps = {
  fixturesData: Fixture[];
};

// Função para renderizar as partidas por liga
export default function FixturesByLeague({ fixturesData }: PageProps) {
  {
    /* Verifica se o array fixturesData tem elementos */
  }
  if (fixturesData.length > 0) {
    {
      /* Se tiver elementos, mapeia os 4 elementos do array para renderizar essas partidas da liga */
    }
    return fixturesData.slice(0, 4).map((match, i) => {
      {
        /* Renderiza as partidas da liga */
      }
      return <FixtureItem match={match} index={i} key={match.fixture.id} />;
    });
  }
}

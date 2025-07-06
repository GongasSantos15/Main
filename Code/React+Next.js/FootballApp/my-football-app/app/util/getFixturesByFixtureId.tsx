// Imports
import "server-only";
import { Fixture } from "@/types";
import getFixtures from "./getFixtures";

// Função para obter as partidas por ID de partida
export default async function getFixturesByFixtureId(
  id: number,
): Promise<Fixture | undefined> {
  try {
    const allFixturesByLeague = await getFixtures();

    // Loop externo: Itera sobre cada liga no array das partidas de todas as ligas
    for (const league of allFixturesByLeague) {
      // Loop interno: Itera sobre cada partida da liga atual
      for (const fixture of league.fixtures) {
        // Verifica se o ID da partida atual é igual ao ID procurado e retorna a partida
        if (fixture.fixture.id === id) {
          return fixture;
        }
      }
    }

    // Senão, retorna undefined
    return undefined;
  } catch (error) {
    console.error(
      "Error occured while fetching fixture by fixture Id: ",
      error,
    );
  }
}

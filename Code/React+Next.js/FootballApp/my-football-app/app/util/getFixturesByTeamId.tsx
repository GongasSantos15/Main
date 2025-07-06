// Imports
import "server-only";
import { Fixture } from "@/types";
import getFixtures from "./getFixtures";
import moment from "moment";

// Função para obter as partidas de uma equipa específica
export default async function getFixturesByTeamId(
  id: number,
): Promise<Fixture[]> {
  try {
    const allFixturesByLeague = await getFixtures();

    // Array para armazenar as partidas da equipa
    const fixturesByTeamId: Fixture[] = [];

    // Loop externo: Itera sobre cada liga no array das partidas de todas as ligas
    for (const league of allFixturesByLeague) {
      // Loop interno: Itera sobre cada partida da liga
      for (const fixture of league.fixtures) {
        // Verifica se o ID procurado é igual ao ID da equipa local ou visitante, se sim adiciona a partida ao array
        if (fixture.teams.home.id === id || fixture.teams.away.id === id) {
          fixturesByTeamId.push(fixture);
        }
      }
    }

    // Ordena as partidas por data
    const fixturesByTeamIdSorted: Fixture[] = fixturesByTeamId.sort((a, b) => {
      const time1 = moment(a.fixture.date);
      const time2 = moment(b.fixture.date);

      if (time1.isBefore(time2)) {
        return -1;
      } else if (time1.isAfter(time2)) {
        return 1;
      } else {
        return 0;
      }
    });

    // Retornar as partidas ordenadas
    return fixturesByTeamIdSorted;
  } catch (error) {
    console.error(
      "An error occured while fetching fixtures by Team Id: ",
      error,
    );
    throw error;
  }
}

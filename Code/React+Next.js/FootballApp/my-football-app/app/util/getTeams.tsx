// Imports
import "server-only";
import { Standing, Team } from "@/types";
import getStandings from "./getStandings";

// Função para obter as equipas
export default async function getTeams(): Promise<Team[]> {
  try {
    // Variável para guardar os resultados das equipas
    const standings: Standing[] = await getStandings();

    // Variável para guardar as equipas
    const teams: Team[] = [];

    // Ciclo for para percorrer as ligas
    for (const league of standings) {
      // Ciclo for para iterar sobre cada classificação dentro da liga
      for (const standing of league.league.standings) {
        // Verifica se a classificação é um array
        if (Array.isArray(standing)) {
          // Se for um array, itera sobre cada equipa na classificação e adiciona a mesma ao array de equipas
          for (const team of standing) {
            teams.push(team);
          }
        } else {
          throw new Error("Invalid standings data");
        }
      }
    }

    return teams;
  } catch (error) {
    console.error("Error occured while fetching teams: ", error);
    throw error;
  }
}

// Imports
import "server-only";
import { Team } from "@/types";
import getTeams from "./getTeams";

// Função para obter informações de equipa pelo ID da Equipa
export default async function getTeamInfoByTeamId(
  id: number,
): Promise<Team | undefined> {
  try {
    // Variável para armazenar as equipas
    const teams: Team[] = await getTeams();

    // Itera sobre as equipas
    for (const team of teams) {
      // Verifica se o ID da Equipa corresponde ao ID fornecido e retorna a equipa
      if (team.team.id === id) {
        return team;
      }
    }

    // Se não encontrar a equipa, retorna undefined
    return undefined;
  } catch (error) {
    console.error(
      "An error occured while fetching team info by team Id: ",
      error,
    );
    throw error;
  }
}

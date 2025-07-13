// Imports
import { AllFixtures, Fixture } from "@/types";
import { USE_SAMPLE } from "../sampleData/useSample";
import moment from "moment";
import getFixturesSample from "../sampleData/getFixturesSample";

// Chave da API de futebol (API-Football)
const API_KEY = process.env.API_KEY as string;

// Ligas que serão utilizadas para as partidas
const leagues = [
  { league: 39, name: "EPL" },
  { league: 140, name: "La Liga" },
  { league: 78, name: "Bundesliga" },
  { league: 135, name: "Serie A" },
  { league: 61, name: "Ligue 1" },
  { league: 2, name: "Champions League" },
  { league: 3, name: "Europa League" },
  { league: 848, name: "Conference League" },
  { league: 531, name: "UEFA Super Cup" },
  { league: 15, name: "FIFA Club World Cup" },
  { league: 45, name: "FA Cup" },
  { league: 48, name: "Carabao Cup" },
  { league: 528, name: "Community Shield" },
  { league: 143, name: "Copa Del Rey" },
  { league: 556, name: "Super Cup LaLiga" },
  { league: 529, name: "Super Cup BundesLiga" },
  { league: 547, name: "Super Cup Serie A" },
  { league: 137, name: "Coppa Italia" },
  { league: 65, name: "Coupe de la Ligue" },
  { league: 66, name: "Coupe de France" },
  { league: 526, name: "Trophee des Champions" },
  { league: 94, name: "Primeira Liga" },
  { league: 667, name: "Friendlies Clubs" },
];

// Função que retorna os jogos de uma liga
async function fetchFixturesByLeague(
  year: number,
  league: number,
): Promise<Fixture[]> {
  const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${league}&season=${year}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
    next: {
      // Atualizar dados a cada 24 horas
      revalidate: 60 * 60 * 24,
    },
  };

  // Faz a requisição para a API
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const fixtures: Fixture[] = data.response;

    // Retorna um array vazio se não existirem partidas
    if (fixtures === null || fixtures === undefined) {
      return [];
    } else {
      return fixtures;
    }
  } catch (err) {
    console.log(`Error fetching ${league} fixtures in year ${year}: ${err}`);
    return [];
  }
}

// Função principal que vai retornar todas as partidas de todas as ligas
export default async function getFixtures(): Promise<AllFixtures[]> {
  // Se USE_SAMPLE retornar true, retorna os dados de amostra
  if (USE_SAMPLE) {
    return getFixturesSample();
  }

  try {
    // Obtém a data atual
    const currentTime = moment();
    const year = currentTime.year();
    const month = currentTime.month();

    // Array para armazenar todas as partidas de todas as ligas
    const allFixturesByLeague: AllFixtures[] = [];

    // Itera sobre cada liga para obter as partidas
    for (const league of leagues) {
      // Se o mês atual for anterior ou igual a junho, obter partidas do ano anterior (calendário futebol: agosto a maio)
      if (month <= 5) {
        allFixturesByLeague.push({
          name: league.name,
          fixtures: await fetchFixturesByLeague(year - 1, league.league),
        });
        // Se o mês atual for agosto ou posterior, obter partidas do ano atual
      } else if (month >= 8) {
        allFixturesByLeague.push({
          name: league.name,
          fixtures: await fetchFixturesByLeague(year, league.league),
        });
        // Caso contrário, Obter partidas de ambos os anos (ano anterior e atual)
      } else {
        allFixturesByLeague.push({
          name: league.name,
          fixtures: await fetchFixturesByLeague(year - 1, league.league),
        });
        const existingData = allFixturesByLeague.find(
          (data) => data.name === league.name,
        );
        if (existingData) {
          existingData.fixtures.push(
            ...(await fetchFixturesByLeague(year, league.league)),
          );
        } else {
          allFixturesByLeague.push({
            name: league.name,
            fixtures: await fetchFixturesByLeague(year, league.league),
          });
        }
      }
    }

    // Retorna todas as partidas das ligas
    return allFixturesByLeague;
  } catch (error) {
    console.error("An error occured while fetching fixtures: ", error);
    throw error;
  }
}

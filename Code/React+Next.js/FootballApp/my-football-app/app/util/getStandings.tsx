// Ficheiro para obter os dados de classificação da API de futebol
import "server-only";
import { Standing } from "@/types";
import moment from "moment";
import { USE_SAMPLE } from "../sampleData/useSample";
import getStandingsSample from "../sampleData/getStandingsSample";

export default async function getStandings(): Promise<Standing[]> {
  // Previne o uso de chamadas à API se USE_SAMPLE estiver definido como true
  if (USE_SAMPLE) {
    return getStandingsSample();
  }

  // Variáveis necessárias (currentTime, month, year)
  const currentTime = moment();
  const month = currentTime.month();
  let year;

  // Verificar se o mês é antes de junho, por que senão o ano desportivo é o anterior, já que o ano desportivo é de setembro a junho
  if (month <= 6) {
    year = currentTime.year() - 1;
  } else {
    year = currentTime.year();
  }

  // Variável da API
  const API_KEY: string = process.env.API_KEY as string;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
    // Isto vai revalidar a data a cada 24 horas
    // O servidor vai guardar a resposta em cache para evitar pedidos repetidos durante 24 horas
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  // Variável para armazenar os resultados
  const standings: Standing[] = [];

  // Variável das ligas a usar
  const leagues = [
    { name: "EPL", id: 39 },
    { name: "La Liga", id: 140 },
    { name: "Bundesliga", id: 78 },
    { name: "Serie A", id: 135 },
    { name: "Ligue 1", id: 61 },
  ];

  // Para cada liga, buscar os dados e mostrar os resultados
  for (const league of leagues) {
    let url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${year}&league=${league.id}`;

    await fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        const standing = data.response[0];

        if (standing) {
          standings.push(standing);
        }
      })
      .catch((err) => {
        console.error(`Error fetching ${league.name} standings ${err}`);
      });
  }

  return standings;
}

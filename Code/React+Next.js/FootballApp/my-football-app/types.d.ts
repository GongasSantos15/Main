// Ficheiro que determina o tipo de dados utilizados no projeto

type Standing = {
  league: league;
};

type League = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  seasons: number;
  standings: [Team[]];
};

type Team = {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  goalsDiff: number;
  group: string;
  status: string;
  description: string;
  all: Games;
  home: Games;
  away: Games;
  update: string;
};

type Games = {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: {
    for: number;
    against: number;
  };
};

export { Standing };

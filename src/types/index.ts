type Racer = {
  name: string;
  length: number;
  weight: number;
  color: string;
  likelihoodOfWinning: number | string;
};

type Race = {
  [key: string]: Racer;
};

export type { Racer, Race };

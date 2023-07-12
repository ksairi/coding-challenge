type Racer = {
  name: string;
  length: number;
  weight: number;
  color: string;
  // Q: This typing 'is a bit misleading.
  // It's really `number | RacerState`, and `RacerState` isn't really a "likelihood of winning"
  likelihoodOfWinning: number | string;
};

type Race = {
  [key: string]: Racer;
};

export type { Racer, Race };

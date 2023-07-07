import { Race } from "../types";
import { RacerState } from "./enums";

const sortRace = (race: Race) => {
  const racers = Object.values(race);
  const notCalculatedYet = racers.filter(
    (racer) => racer.likelihoodOfWinning === RacerState.IN_PROGRESS
  );
  const calculatedAlready = racers.filter(
    (racer) => racer.likelihoodOfWinning !== RacerState.IN_PROGRESS
  );

  const calculatedAlreadySorted = calculatedAlready.sort((a, b) => {
    if (a.likelihoodOfWinning > b.likelihoodOfWinning) {
      return -1;
    }
    if (a.likelihoodOfWinning < b.likelihoodOfWinning) {
      return 1;
    }
    return 0;
  });
  const allSorted = [...calculatedAlreadySorted, ...notCalculatedYet];
  const raceSorted = allSorted.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.name]: curr,
    }),
    {}
  );
  return raceSorted;
};

export { sortRace };

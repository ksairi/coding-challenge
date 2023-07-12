import { Race } from "../types";
import { RacerState } from "./enums";

// Q: This function is not type safe. Its return signature is `{}`
const sortRace = (race: Race) => {
  const racers = Object.values(race);
  const notCalculatedYet = racers.filter(
    (racer) => racer.likelihoodOfWinning === RacerState.IN_PROGRESS
  );

  // Q: This is somewhat confusing. If it's `NOT_CALCULATED_YET`, then it shouldn't be included in `calculatedAlready`
  // Hidden in the logic is how `likelihoodOfWinning` is set to the generated number returned from `generateRacerWinLikelihoodCalculator`
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

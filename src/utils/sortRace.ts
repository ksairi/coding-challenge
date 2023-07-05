import { Race } from "../types";

const NOT_CALCULATED_YET = "not calculated yet";

const sortRace = (race: Race) => {
  const racers = Object.values(race);
  const notCalculatedYet = racers.filter(
    (racer) => racer.likelihoodOfWinning === NOT_CALCULATED_YET
  );
  const calculatedAlready = racers.filter(
    (racer) => racer.likelihoodOfWinning !== NOT_CALCULATED_YET
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

export { sortRace, NOT_CALCULATED_YET };

import { useEffect, useState } from "react";
import { Race, Racer } from "../types";
import { generateRacerWinLikelihoodCalculator, sortRace } from "../utils";

const NOT_CALCULATED_YET = "not calculated yet";

enum RaceState {
  NOT_YET_RUN = "Not Yet Run",
  IN_PROGRESS = "In progress",
  ALL_CALCULATED = "All calculated",
}

const useStartRace = (racers: Racer[]) => {
  const [race, setRace] = useState<Race>({});
  const [hasRaceStarted, setRaceStarted] = useState(false);
  const [raceState, setRaceState] = useState(RaceState.NOT_YET_RUN);
  useEffect(() => {
    const initialRaceState = racers.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.name]: { ...curr, likelihoodOfWinning: NOT_CALCULATED_YET },
      }),
      {}
    );
    setRace(initialRaceState);
  }, [racers]);

  const starRace = () => {
    setRaceState(RaceState.IN_PROGRESS);
    setRaceStarted(true);
  };

  useEffect(() => {
    const racers = Object.values(race);
    const allCalculated = racers.filter(
      (racer) => racer.likelihoodOfWinning !== NOT_CALCULATED_YET
    );

    if (allCalculated.length > 0 && allCalculated.length === racers.length) {
      setRaceState(RaceState.ALL_CALCULATED);
    }
  }, [
    Object.values(race).filter(
      (racer) => racer.likelihoodOfWinning === NOT_CALCULATED_YET
    ).length,
  ]);

  if (hasRaceStarted) {
    racers.forEach((racer) => {
      const racerWinLikelihoodCalculator =
        generateRacerWinLikelihoodCalculator();
      racerWinLikelihoodCalculator((likelihoodOfRacerWinning) => {
        setRace((prev) => {
          const raceSorted = sortRace({
            ...prev,
            [racer.name]: {
              ...racer,
              likelihoodOfWinning: likelihoodOfRacerWinning,
            },
          });
          return raceSorted;
        });
      });
    });
  }
  return { race, starRace, raceState };
};
export { useStartRace };

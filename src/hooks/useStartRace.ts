import { useEffect, useState } from "react";
import { Race, Racer } from "../types";
import {
  RaceState,
  RacerState,
  generateRacerWinLikelihoodCalculator,
  sortRace,
} from "../utils";

const useStartRace = (racers: Racer[]) => {
  const [race, setRace] = useState<Race>({});
  const [raceState, setRaceState] = useState(RaceState.NOT_YET_RUN);

  const hasRaceStarted = raceState === RaceState.IN_PROGRESS;

  useEffect(() => {
    if (raceState !== RaceState.ALL_CALCULATED) {
      const initialRaceState = racers.reduce(
        (prev, curr) => ({
          ...prev,
          [curr.name]: {
            ...curr,
            likelihoodOfWinning: hasRaceStarted
              ? RacerState.IN_PROGRESS
              : RacerState.NOT_CALCULATED_YET,
          },
        }),
        {}
      );
      setRace(initialRaceState);
    }
  }, [racers, hasRaceStarted, raceState]);

  useEffect(() => {
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
                likelihoodOfWinning: Math.round(likelihoodOfRacerWinning * 100),
              },
            });
            return raceSorted;
          });
        });
      });
    }
  }, [racers, hasRaceStarted]);

  useEffect(() => {
    const racers = Object.values(race);
    const allCalculated = racers.filter(
      (racer) => racer.likelihoodOfWinning !== RacerState.IN_PROGRESS
    );

    if (allCalculated.length > 0 && allCalculated.length === racers.length) {
      setRaceState(RaceState.ALL_CALCULATED);
    }
  }, [
    Object.values(race).filter(
      (racer) => racer.likelihoodOfWinning === RacerState.IN_PROGRESS
    ).length,
  ]);

  const starRace = () => {
    setRaceState(RaceState.IN_PROGRESS);
  };

  const resetRace = () => {
    setRace({});
    setRaceState(RaceState.NOT_YET_RUN);
  };

  return { race, starRace, raceState, resetRace };
};
export { useStartRace, RacerState, RaceState };

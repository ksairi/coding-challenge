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

  // Q: Are we not able to derive this `raceState` from `race`?
  const [raceState, setRaceState] = useState(RaceState.NOT_YET_RUN);

  const hasRaceStarted = raceState === RaceState.IN_PROGRESS;

  // Q: In general, I would avoid using `useEffect` for this kind of thing (the documentation says it's an anti-pattern).
  // If we know, exactly when to set the initial state, we should do it at that time and not as a side effect in response to `raceState` changing

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

    // Q: This is a great example of how we're deriving a small piece of state from the main piece of state, `race`
    // `allCalculated` should be really be filtering for if `racer.likelihoodOfWinning === RacerState.ALL_CALCULATED
    const allCalculated = racers.filter(
      (racer) => racer.likelihoodOfWinning !== RacerState.IN_PROGRESS
    );

    if (allCalculated.length > 0 && allCalculated.length === racers.length) {
      setRaceState(RaceState.ALL_CALCULATED);
    }
  }, [
    // Q: The dependency array should have stable reference in it
    // `Object.values(race)` creates a new reference every time
    // Therefore, the code in this dependency array will be run every time `useStartRace` is called
    // Since `length` is a primitive, it ends up not causing unexpected behavior; but, even so, it's a good practice to have stable references in the dependency array
    Object.values(race).filter(
      (racer) => racer.likelihoodOfWinning === RacerState.IN_PROGRESS
    ).length,
  ]);

  const starRace = () => {
    // Q: This is where more logic should be done to actually "start" the race (not just change a state variable and have logic somewhere else react to that change)
    setRaceState(RaceState.IN_PROGRESS);
  };

  const resetRace = () => {
    // Q: If you have keep 2 separate pieces of state in sync, it's code smell that there should only be one piece of state
    setRace({});
    setRaceState(RaceState.NOT_YET_RUN);
  };

  return { race, starRace, raceState, resetRace };
};
export { useStartRace, RacerState, RaceState };

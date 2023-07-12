enum RacerState {
  // Q: Using this pattern, should there not be a `Calculated` state?
  NOT_CALCULATED_YET = "not calculated yet",
  IN_PROGRESS = "In progress",
}

enum RaceState {
  NOT_YET_RUN = "Not Yet Run",
  IN_PROGRESS = "In progress",
  ALL_CALCULATED = "All calculated",
}

export { RaceState, RacerState };

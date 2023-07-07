import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useFetchData } from "./src/hooks";
import { RaceState, useStartRace } from "./src/hooks/useStartRace";
import { Race } from "./src/components/race";
const DATA_URL =
  "https://ba6gijdps7.execute-api.us-east-1.amazonaws.com/racers";
export default function App() {
  const { isLoading, fetchData, data, resetData } = useFetchData(DATA_URL);
  const { race, starRace, raceState, resetRace } = useStartRace(data);
  const [hasRaceStarted, setHasRaceStarted] = useState(false);

  const onStartRace = () => {
    setHasRaceStarted(true);
    starRace();
  };

  const onReset = () => {
    resetRace();
    resetData();
    setHasRaceStarted(false);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {!data.length ? <Button onPress={fetchData} title="Fetch Data" /> : null}
      {data.length && !hasRaceStarted ? (
        <Button onPress={onStartRace} title="Start Race" />
      ) : null}
      {data.length ? (
        <View style={styles.raceContainer}>
          <Race raceState={raceState}>{race}</Race>
        </View>
      ) : null}
      {raceState === RaceState.ALL_CALCULATED ? (
        <Button onPress={onReset} title="Reset" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  raceContainer: {
    marginTop: 20,
  },
});

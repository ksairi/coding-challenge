import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useFetchData } from "./src/hooks";
import { useStartRace } from "./src/hooks/useStartRace";
import { Race } from "./src/components/race";
const DATA_URL =
  "https://ba6gijdps7.execute-api.us-east-1.amazonaws.com/racers";
export default function App() {
  const { isLoading, fetchData, data } = useFetchData(DATA_URL);
  const { race, starRace, raceState } = useStartRace(data);
  const [hasRaceStarted, setHasRaceStarted] = useState(false);

  const onStartRace = () => {
    setHasRaceStarted(true);
    starRace();
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
      {!data.length && <Button onPress={fetchData} title="Fetch Data" />}
      {!!data.length && !hasRaceStarted && (
        <Button onPress={onStartRace} title="Start Race" />
      )}
      {!!data.length && (
        <View style={styles.raceContainer}>
          <Race raceState={raceState}>{race}</Race>
        </View>
      )}
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

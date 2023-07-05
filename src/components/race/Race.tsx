import React from "react";

import { Text, StyleSheet, View } from "react-native";
import type { Race as RaceType } from "../../types";
import { Racer } from "../racer";

const Race = ({
  children,
  raceState,
}: {
  children: RaceType;
  raceState: string;
}) => (
  <>
    <View style={styles.raceStateContainer}>
      <Text style={styles.raceStateLabel}>Race State: </Text>
      <Text style={styles.raceStateValue}>{raceState}</Text>
    </View>
    {Object.values(children).map((racer, index) => (
      <Racer value={racer} key={index} />
    ))}
  </>
);

const styles = StyleSheet.create({
  raceStateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  raceStateValue: {
    color: "blue",
  },
  raceStateLabel: {
    color: "black",
  },
});

export { Race };

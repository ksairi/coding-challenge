import React from "react";

import { View, Text, StyleSheet } from "react-native";
import type { Racer as RacerType } from "../../types";

const Racer = ({ value }: { value: RacerType }) => (
  <View style={styles.racerContainer}>
    <View style={styles.racerDataContainer}>
      <Text style={{ color: value.color.toLowerCase() }}>{value.name}</Text>
      <Text> weight: </Text>
      <Text style={{ color: value.color.toLowerCase() }}>{value.weight}</Text>
      <Text> length: </Text>
      <Text style={{ color: value.color.toLowerCase() }}>{value.length}</Text>
    </View>
    <Text> % of win: </Text>
    <Text style={{ color: value.color.toLowerCase() }}>
      {value.likelihoodOfWinning}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  racerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  racerDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Racer };

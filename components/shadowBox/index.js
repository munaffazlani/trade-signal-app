import React from "react";
import { StyleSheet, View } from "react-native";

const ShadowBox = ({ children, style }) => {
  return <View style={[styles.container, { ...style }]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    height: 170,
    flexDirection: "row",
    backgroundColor: "#ffff",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

export default ShadowBox;

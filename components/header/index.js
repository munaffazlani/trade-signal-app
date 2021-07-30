import React from "react";
import { StyleSheet, Text, View } from "react-native";
const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0de0dd",
  },
  headerText: {
    fontSize: 20,
  },
});

export default Header;

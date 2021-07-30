import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import SignalViewNavigation from "./routes/signalView";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SignalViewNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

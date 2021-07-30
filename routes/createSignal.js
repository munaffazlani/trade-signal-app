import React, {useState, useEffect} from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignalList from "../components/signalBox";
import SignalDetail from "../components/signalDetail";

const SignalStack = createStackNavigator();

const SignalView = () => {
  return (
    <NavigationContainer initialRouteName="signalList">
      <SignalStack.Navigator>
        <SignalStack.Screen
          name="signalList"
          component={SignalList}
          options={{ title: "All Signals" }}
        />
        <SignalStack.Screen
          name="signalDetail"
          component={SignalDetail}
          options={{ title: "All Signal" }}
        />
      </SignalStack.Navigator>
    </NavigationContainer>
  );
};

export default SignalView;

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignalList from "../components/SignalList";
import MenuBox from "../components/menuBox";
import SignalDetail from "../components/signalDetail";
import { database } from "../configs/firebase";
import { CacheManager } from "react-native-expo-image-cache";
import GroupList from "../components/groupList";

const SignalStack = createStackNavigator();
// import RteContainer from "./rte.style.js";
const SignalView = () => {
  const [menu, setmenu] = useState([]);
  const menuList = [
    {
      image: require("../assets/crypto.png"),
      name: "Crypto Signals",
      type: "crypto",
    },
    {
      image: require("../assets/forex.png"),
      name: "Forex Signals",
      type: "forex",
    },
    {
      image: require("../assets/ins.png"),
      name: "Stock Market",
      type: "ins",
    },
  ];
  useEffect(() => {
    setmenu(menuList);
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#f0f0f0",
    },
  };
  return (
    <NavigationContainer>
      <SignalStack.Navigator>
        <SignalStack.Screen
          name="menuScreen"
          options={{ title: "Markets" }}
          component={GroupList}
        />
        <SignalStack.Screen
          name="signalList"
          options={({ route }) => {
            return {
              title: route.params.title,
            };
          }}
          component={SignalList}
        />
        <SignalStack.Screen
          name="signalDetail"
          component={SignalDetail}
          options={{ title: "Signal Detail" }}
        />
      </SignalStack.Navigator>
    </NavigationContainer>
  );
};

export default SignalView;

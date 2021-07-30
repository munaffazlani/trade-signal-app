import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import ShadowBox from "../shadowBox";
import Image from "../Image";
import { useNavigation } from "@react-navigation/native";

const MenuBox = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      delayPressIn={100}
      style={styles.menuContainer}
      onPress={() => {
        navigation.navigate("signalList", data.name);
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          image={data.image}
          style={{ borderRadius: 20 }}
        ></Image>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuContainer: { flex: 1 },
  imageContainer: {
    minHeight: 200,
    elevation: 1,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderRadius: 10,
    shadowOffset: {
      width: 8,
      height: 8,
    },
  },
});

export default MenuBox;

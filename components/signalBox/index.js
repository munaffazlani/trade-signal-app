import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import ShadowBox from "../shadowBox";
import Image from "../Image";
import { useNavigation } from "@react-navigation/native";

const SignalBox = ({ data }) => {
  const navigation = useNavigation();
  const date = data.timestamp.toDate();
  const minuteString = date.getMinutes().toString();
  const secondString = date.getSeconds().toString();
  let hourAndAMPM = date
    .toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
    })
    .split(" ");

  const hour =
    hourAndAMPM[0].length > 1 ? hourAndAMPM[0] : `0${hourAndAMPM[0]}`;
  const minute = minuteString.length > 1 ? minuteString : `0${minuteString}`;
  const second = secondString.length > 1 ? secondString : `0${secondString}`;

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const day =
    today.toDateString() === date.toDateString()
      ? "Today"
      : yesterday.toDateString() === date.toDateString()
      ? "Yesterday"
      : date.toDateString();
  return (
    <TouchableOpacity
      delayPressIn={100}
      onPress={() => {
        navigation.navigate("signalDetail", data);
      }}
    >
      <ShadowBox>
        <View style={styles.imageContainer}>
          <Image uri={data.imagesLinks && data.imagesLinks[0]}></Image>
        </View>
        <View style={styles.descriptionBox}>
          <Text style={styles.signalTitle}>{data.title}</Text>
          <Text style={styles.shortDesc}>
            {data.description.slice(0, 60) + "...."}
          </Text>
        </View>
        <Text
          style={styles.dateTime}
        >{` ${day}, ${hour}:${minute}:${second} ${hourAndAMPM[1]}`}</Text>
      </ShadowBox>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1.5,
    borderRadius: 10,
    overflow: "hidden",
  },
  dateTime: {
    position: "absolute",
    bottom: 5,
    right: 10,
  },
  descriptionBox: {
    marginLeft: 10,
    marginTop: 10,
    flex: 2,
    height: "50%",
  },
  signalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  shortDesc: {
    fontSize: 15,
  },
});

export default SignalBox;

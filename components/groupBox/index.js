import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button,
} from "react-native";
import ShadowBox from "../shadowBox";
import Image from "../Image";
import { useNavigation } from "@react-navigation/native";

const GroupBox = ({ data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      delayPressIn={100}
      onPress={() =>
        navigation.navigate("signalList", {
          title: data.groupName,
          id: data.id,
        })
      }
    >
      <ShadowBox>
        <View style={styles.imageContainer}>
          <Image uri={data.featuredImage}></Image>
        </View>
        <View style={styles.descriptionBox}>
          <Text style={styles.signalTitle}>{data.groupName}</Text>
          <Text style={styles.groupDescription}>
            {data.groupDescription.slice(0, 60) + "...."}
          </Text>
        </View>
        <Text style={styles.subscribers}>
          Subscribers : {data.groupSubscribers}
        </Text>
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
  subscribers: {
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

export default GroupBox;

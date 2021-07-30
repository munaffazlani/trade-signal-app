import React from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Image from "../Image";

const SignalDetail = () => {
  const route = useRoute();
  const data = route.params;
  const preview = {
    uri: "",
  };
  return (
    <ScrollView vertical="true" style={styles.scrollView}>
      {data.imagesLinks?.map((uri, ind) => (
        <View key={ind} style={styles.imageContainer}>
          <Image resizeMode="contain" uri={uri}></Image>
        </View>
      ))}
      <View style={styles.descriptionBox}>
        <Text style={styles.signalTitle}>{data.title}</Text>
        <Text style={styles.date}>{data.dateTime}</Text>
        <Text style={styles.shortDesc}>{data.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    height: 200,
    padding: 10,
    elevation: 1,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      width: 8,
      height: 8,
    },
  },
  scrollView: {
    padding: 10,
    backgroundColor: "white",
  },
  date: {
    marginBottom: 10,
  },
  image: {
    flex: 1,
    marginBottom: 10,
    height: undefined,
    width: undefined,
  },
  descriptionBox: {
    padding: 10,
    marginEnd: 25,
    flex: 2,
    height: "100%",
  },
  signalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  shortDesc: {
    fontSize: 15,
  },
});

export default SignalDetail;

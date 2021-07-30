import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import SignalBox from "../signalBox";
import { database, firestore } from "../../configs/firebase";
import { CacheManager } from "react-native-expo-image-cache";

const SignalList = () => {
  const [signals, setsignals] = useState([]);
  const [lastVisible, setLastVisible] = useState({});

  const getSignals = () => {
    const signalRef = firestore
      .collection("signals")
      .orderBy("timestamp")
      .limit(5);
    signalRef.onSnapshot((querySnapshot) => {
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      var signals = [];
      querySnapshot.forEach((doc) => {
        signals.push(doc.data());
      });
      setsignals(signals);
      setLastVisible(lastVisible);
    });
  };

  const getMoreSignals = () => {
    if (lastVisible) {
      const signalRef = firestore
        .collection("signals")
        .orderBy("timestamp")
        .startAfter(lastVisible)
        .limit(5);
      signalRef.onSnapshot((querySnapshot) => {
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        var signals = [];
        querySnapshot.forEach((doc) => {
          signals.push(doc.data());
        });
        setsignals((prev) => [...prev, ...signals]);
        setLastVisible(lastVisible);
      });
    }
  };

  useEffect(() => {
    getSignals();
  }, []);
  console.log(signals);
  return (
    <FlatList
      data={signals}
      onEndReachedThreshold={0.1}
      onEndReached={() => getMoreSignals()}
      keyExtractor={(item, index) => index.toString()}
      scrollEventThrottle={150}
      renderItem={(data) => {
        return <SignalBox data={data.item} />;
      }}
    />
  );
};

export default SignalList;

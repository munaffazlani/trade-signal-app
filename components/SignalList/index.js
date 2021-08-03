import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import SignalBox from "../signalBox";
import { handleSubscription } from "../../utils/handleSubscription";
import { getData } from "../../utils/asyncStorageMethods";
import Loader from "../Loader";
import { firestore } from "../../configs/firebase";

const SignalList = ({ route }) => {
  const { id } = route.params;
  const [signals, setsignals] = useState([]);
  const [lastVisible, setLastVisible] = useState({});
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState({ subscribed: 0 });
  const getSignals = () => {
    setLoading(true);
    const signalRef = firestore
      .collection("groups")
      .doc(id)
      .collection("allSignals")
      .limit(5);
    signalRef.onSnapshot((querySnapshot) => {
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      var signals = [];
      querySnapshot.forEach((doc) => {
        signals.push(doc.data());
      });
      setLoading(false);
      setsignals(signals);
      setLastVisible(lastVisible);
    });
  };
  const getMoreSignals = () => {
    if (lastVisible) {
      const signalRef = firestore
        .collection("groups")
        .doc(id)
        .collection("allSignals")
        .startAfter(lastVisible)
        .limit(5);

      signalRef.get().then((querySnapshot) => {
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
  const checkSubscription = async () => {
    try {
      const token = await getData("pushToken");
      if (token) {
        const subscriberTokensRef = firestore
          .collection("groups")
          .doc(id)
          .collection("subscriberTokens");
        subscriberTokensRef.doc(token).onSnapshot((doc) => {
          console.log("Current data: ", doc.data());
          let data = doc.data();
          data = data ? data : {};
          setSubscription(data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let isMounted = true;
    getSignals();
    checkSubscription();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
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
      <TouchableOpacity
        onPress={() => {
          if (subscription.mute === undefined || subscription.mute === 1) {
            // this will unmute or subscribe , logic for mute and unmute handled in handlesubscription func.
            handleSubscription(id);
          }
          if (subscription.mute === 0) {
            handleSubscription(id, true);
          }
        }}
        style={{
          justifyContent: "center",
          height: 50,
          width: "100%",
          backgroundColor:
            subscription.mute === 0
              ? "#e32020"
              : subscription.mute === 1
              ? "#385fe0"
              : "#385fe0",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, color: "white" }}>
          {subscription.mute === 0
            ? "Mute"
            : subscription.mute === 1
            ? "Unmute"
            : "Join"}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default SignalList;

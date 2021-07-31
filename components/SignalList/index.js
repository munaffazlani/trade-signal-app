import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import SignalBox from "../signalBox";
import Loader from "../Loader";
import { firestore } from "../../configs/firebase";

const SignalList = ({ route }) => {
  const { id } = route.params;
  const [signals, setsignals] = useState([]);
  const [lastVisible, setLastVisible] = useState({});
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getSignals();
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
    </>
  );
};

export default SignalList;

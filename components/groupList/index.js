import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import Loader from "../Loader";
import GroupBox from "../groupBox";
import { firestore } from "../../configs/firebase";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [lastVisible, setLastVisible] = useState({});
  const [loading, setLoading] = useState(false);

  const getMoreGroups = () => {
    if (lastVisible) {
      const groupRef = firestore
        .collection("groups")
        .orderBy("groupSubscribers", "desc")
        .startAfter(lastVisible)
        .limit(6);
      groupRef.get().then((querySnapshot) => {
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        var groups = [];
        querySnapshot.forEach((doc) => {
          groups.push(doc.data());
        });
        setGroups((prev) => [...prev, ...groups]);
        setLastVisible(lastVisible);
      });
    }
  };

  useEffect(() => {
    const unsubscribeToGroups = firestore
      .collection("groups")
      .orderBy("groupSubscribers", "desc")
      .limit(8)
      .onSnapshot((querySnapshot) => {
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        var groups = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          groups.push(data);
        });
        setGroups(groups);
        setLastVisible(lastVisible);
      });
    return () => unsubscribeToGroups();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <FlatList
      data={groups}
      onEndReachedThreshold={0.1}
      onEndReached={() => getMoreGroups()}
      keyExtractor={(item, index) => index.toString()}
      scrollEventThrottle={150}
      renderItem={(data) => {
        return <GroupBox data={data.item} />;
      }}
    />
  );
};

export default GroupList;

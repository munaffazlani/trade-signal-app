const functions = require("firebase-functions");
const fetch = require("node-fetch");
const admin = require("firebase-admin");
const {firestore} = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.firestore
    .document("groups/{groupId}/allSignals/{signalId}")
    .onCreate((snap, context) => {
      const groupId = context.params.groupId;
      const newSignal = snap.data();
      const messages = [];
      console.log(newSignal, "newSignal");
      return new Promise((resolve, reject) => {
        firestore()
            .collection("groups")
            .doc(groupId)
            .collection("subscriberTokens")
            .where("mute", "==", 0)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                messages.push({
                  to: doc.id,
                  title: newSignal.title,
                  body: newSignal.description,
                });
              });
              const url = "https://exp.host/--/api/v2/push/send";
              const options = {
                method: "POST",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(messages),
              };
              fetch(url, options)
                  .then((response) => {
                    if (response.ok) {
                      return response.json();
                    }
                    console.log("req. bad");
                    reject(new Error("something bad happened"));
                  })
                  .then((responseJson) => {
                    console.log(responseJson);
                    resolve(responseJson);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
              reject(error);
            });
      });
    });

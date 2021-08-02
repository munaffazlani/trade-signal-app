import React, { useEffect, useRef, useState } from "react";
// import firebase from "firebase";
import { registerForPushNotificationsAsync, storeData } from "./utils/asyncStorageMethods";
import * as Notifications from "expo-notifications";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import SignalViewNavigation from "./routes/signalView";

const AuthContext = React.createContext();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // const [state, dispatch] = React.useReducer(
  //   (prevState, action) => {
  //     switch (action.type) {
  //       case "RESTORE_TOKEN":
  //         return {
  //           ...prevState,
  //           userToken: action.token,
  //           isLoading: false,
  //         };
  //       case "SIGN_IN":
  //         return {
  //           ...prevState,
  //           isSignout: false,
  //           userToken: action.token,
  //         };
  //       case "SIGN_OUT":
  //         return {
  //           ...prevState,
  //           isSignout: true,
  //           userToken: null,
  //         };
  //       default:
  //         return {
  //           isLoading: false,
  //           userToken: null,
  //         };
  //     }
  //   },
  //   {
  //     isLoading: true,
  //     isSignout: false,
  //     userToken: null,
  //   }
  // );
  // const authContext = React.useMemo(
  //   () => ({
  //     signIn: async (data) => {
  //       // In a production app, we need to send some data (usually username, password) to server and get a token
  //       // We will also need to handle errors if sign in failed
  //       // After getting token, we need to persist the token using `SecureStore`
  //       // In the example, we'll use a dummy token

  //       dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
  //     },
  //     signOut: () => dispatch({ type: "SIGN_OUT" }),
  //     signUp: async (data) => {
  //       // In a production app, we need to send user data to server and get a token
  //       // We will also need to handle errors if sign up failed
  //       // After getting token, we need to persist the token using `SecureStore`
  //       // In the example, we'll use a dummy token

  //       dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
  //     },
  //   }),
  //   []
  // );
  // useEffect(() => {
  //   const authObserverUnsubscribe = firebase.auth().onAuthStateChanged(
  //     (user) => {
  //       if (user) {
  //         // User authenticated!
  //         console.log(user);
  //       } else {
  //         console.log("No User");
  //         // There is no signed in user or user signed out
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //       // Not sure when this error occurs, but you might want to handle it too
  //     }
  //   );

  //   return () => {
  //     // ...
  //     authObserverUnsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <AuthContext.Provider value={authContext}> */}
      <SignalViewNavigation />
      {/* </AuthContext.Provider> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

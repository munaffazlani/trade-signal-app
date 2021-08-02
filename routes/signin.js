import React from "react";
import { View, TextInput, Button } from "react-native";
import firebase from "firebase";
import * as GoogleAuthentication from "expo-google-app-auth";
function SignInScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  // const { signIn } = React.useContext(AuthContext);

  const signInWithGoogle = () =>
    GoogleAuthentication.logInAsync({
      iosClientId:
        "344342272741-7dlsaho6839sa2utgo7vf6rd5rpug6at.apps.googleusercontent.com",
      // androidStandaloneAppClientId:
      //   "344342272741-bu36tf36hn5o3jrofhad3ps6e8ooqt0e.apps.googleusercontent.com",
      // iosStandaloneAppClientId:
      //   "344342272741-4loeo6l2i9c1feblr68i8fsg0f1r027a.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    })
      .then((logInResult) => {
        console.log(logInResult);
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;
          const credential = firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          return firebase.auth().signInWithCredential(credential);

          // Successful sign in is handled by firebase.auth().onAuthStateChanged
        }
        return Promise.reject(); // Or handle user cancelation separatedly
      })
      .catch((error) => {
        console.log(error);
        // ...
      });

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/* <Button title="Sign in" onPress={() => signIn({ username, password })} /> */}
      <Button title="Sign in with google" onPress={() => signInWithGoogle()} />
    </View>
  );
}

export default SignInScreen;

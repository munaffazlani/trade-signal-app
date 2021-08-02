import { firestore, firebase } from "../configs/firebase";
import {
  getData,
  registerForPushNotificationsAsync,
} from "./asyncStorageMethods";

export const handleSubscription = async (groupId, mute) => {
  const token = await getData("pushToken");
  if (token) {
    console.log(token, groupId);
    const subscriberTokensRef = firestore
      .collection("groups")
      .doc(groupId)
      .collection("subscriberTokens");
    if (mute) {
      subscriberTokensRef.doc(token).set({ mute: 1 });
      return;
    }
    subscriberTokensRef.doc(token).set({ mute: 0 });
    console.log(groupId);
  } else {
    registerForPushNotificationsAsync(handleSubscription(groupId));
  }
};

import { onAuthStateChanged, User } from "firebase/auth";
import { useSyncExternalStore } from "react";

import { auth } from "@/constants/firebase";

let user: User | null = null;

function subscribeAuthState(notifyChange: () => void) {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    user = currentUser;

    notifyChange();
  });

  return () => {
    user = null;

    unsubscribe();
  };
}

function getCurrentUser() {
  return user;
}

export default function useUser() {
  const user = useSyncExternalStore(subscribeAuthState, getCurrentUser);
  return user;
}

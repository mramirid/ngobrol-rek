import {
  onAuthStateChanged,
  signInAnonymously,
  signOut,
  User,
} from "firebase/auth";
import { useSyncExternalStore } from "react";

import { auth } from "@/constants/firebase";

export default function useAuth() {
  const user = useSyncExternalStore(subscribeAuthState, getCurrentUser);

  const login = async () => {
    await signInAnonymously(auth);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { user, login, logout };
}

let currentUser: User | null = null;

function subscribeAuthState(notifyChange: () => void) {
  const unsubscribe = onAuthStateChanged(auth, (newCurrentUser) => {
    currentUser = newCurrentUser;

    notifyChange();
  });

  return () => {
    currentUser = null;

    unsubscribe();
  };
}

function getCurrentUser() {
  return currentUser;
}

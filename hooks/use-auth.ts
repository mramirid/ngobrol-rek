import {
  onAuthStateChanged,
  signInAnonymously,
  signOut,
  User,
} from "firebase/auth";
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

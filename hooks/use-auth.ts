import { onAuthStateChanged, User } from "firebase/auth";
import { useSyncExternalStore } from "react";

import { auth } from "@/constants/firebase";
import UnimplementedError from "@/errors/unimplemented.error";

export default function useAuth() {
  const user = useSyncExternalStore(subscribeAuthState, getCurrentUser);

  const login = async () => {
    // TODO: sign in anonymously to firebase auth
    throw new UnimplementedError("Login is unimplemented");
  };

  const logout = async () => {
    // TODO: sign out from firebase auth
    throw new UnimplementedError("Logout is unimplemented");
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

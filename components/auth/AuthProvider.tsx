//@ts-ignore
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  onAuthStateChanged,
  signInAnonymously,
  signOut,
  User,
} from "firebase/auth";
import { ReactNode, useLayoutEffect, useState } from "react";

import firebase from "@/constants/firebase";
import AuthContext from "./AuthContext";

const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default function AuthProvider(props: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useLayoutEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const login = async () => {
    await signInAnonymously(auth);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

import { signInAnonymously, signOut } from "firebase/auth";
import { ReactNode } from "react";

import { auth } from "@/constants/firebase";
import useUser from "@/hooks/use-user";
import AuthContext from "./AuthContext";

export default function AuthProvider(props: { children: ReactNode }) {
  const user = useUser();

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

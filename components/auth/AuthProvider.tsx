import { onAuthStateChanged, User } from "firebase/auth";
import { ReactNode, useLayoutEffect, useState } from "react";

import { auth } from "@/constants/firebase";
import AuthContext from "./AuthContext";

export default function AuthProvider(props: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useLayoutEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
}

import { User } from "firebase/auth";
import { createContext } from "react";

const AuthContext = createContext<{
  user: User | null;
  login?: () => Promise<void>;
  logout?: () => Promise<void>;
}>({ user: null });
export default AuthContext;

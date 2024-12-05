import { User } from "firebase/auth";
import { createContext } from "react";

const AuthContext = createContext({ user: null as User | null });
export default AuthContext;

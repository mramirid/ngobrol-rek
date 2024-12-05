import { createContext } from "react";

const LoginContext = createContext<{ prompt: () => void } | undefined>(
  undefined
);
export default LoginContext;

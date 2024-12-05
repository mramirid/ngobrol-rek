import { createContext } from "react";

const LoginPromptContext = createContext<{ show: () => void } | undefined>(
  undefined
);
export default LoginPromptContext;

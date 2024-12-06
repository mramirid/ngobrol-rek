import { createContext } from "react";

const DialogContext = createContext<
  { show: (title: string, message: string) => void } | undefined
>(undefined);
export default DialogContext;

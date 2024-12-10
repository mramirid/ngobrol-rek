import { useSyncExternalStore } from "react";
import { IMessage } from "react-native-gifted-chat";

import UnimplementedError from "@/errors/unimplemented.error";

export default function useMessages() {
  const messages = useSyncExternalStore(subscribeMessages, getMessages);

  const append = async (_message: IMessage) => {
    // TODO: add new doc to collection "messages"
    throw new UnimplementedError("Appending message is unimplemented");
  };

  return [messages, append] as const;
}

let messages: IMessage[] = [];

function subscribeMessages(_notifyNewMessages: () => void) {
  // TODO: listen to collection "messages"
  const unsubscribe = () => {};

  return () => {
    messages = [];

    unsubscribe();
  };
}

function getMessages() {
  return messages;
}

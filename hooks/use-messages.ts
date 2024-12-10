import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useSyncExternalStore } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

import { db } from "@/constants/firebase";
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

const MAX_LOADED_MESSAGES = 100;

function subscribeMessages(notifyNewMessages: () => void) {
  const unsubscribe = onSnapshot(
    query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(MAX_LOADED_MESSAGES)
    ),
    (snapshot) => {
      const incomingMessags = snapshot
        .docChanges()
        .filter((docChange) => docChange.type === "added")
        .map<IMessage>((docChange) => {
          const docId = docChange.doc.id;
          const docData = docChange.doc.data();
          return {
            _id: docId,
            text: docData.text,
            createdAt: docData.createdAt.toDate(),
            user: {
              _id: docData.user._id,
              name: docData.user._id,
            },
          };
        });
      messages = GiftedChat.append(messages, incomingMessags).slice(
        0,
        MAX_LOADED_MESSAGES
      );
      notifyNewMessages();
    }
  );

  return () => {
    messages = [];

    unsubscribe();
  };
}

function getMessages() {
  return messages;
}

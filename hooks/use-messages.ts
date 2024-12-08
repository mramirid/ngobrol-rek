import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useSyncExternalStore } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

import { db } from "@/constants/firebase";

export default function useMessages() {
  const messages = useSyncExternalStore(subscribeMessages, getMessages);

  const append = async (message: IMessage) => {
    await addDoc(collection(db, "messages"), {
      text: message.text,
      createdAt: message.createdAt,
      user: { _id: message.user._id },
    });
  };

  return [messages, append] as const;
}

let messages: IMessage[] = [];

function subscribeMessages(notifyNewMessages: () => void) {
  const unsubscribe = onSnapshot(
    query(collection(db, "messages"), orderBy("createdAt", "desc")),
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
      messages = GiftedChat.append(messages, incomingMessags);
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

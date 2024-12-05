import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

import { db } from "@/constants/firebase";
import useUser from "@/hooks/use-user";

export default function ChatRoom() {
  const user = useUser();

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const incomingMessags = snapshot
          .docChanges()
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
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, incomingMessags)
        );
      }
    );

    return unsubscribe;
  }, []);

  const onSend = async ([message]: IMessage[]) => {
    await addDoc(collection(db, "messages"), {
      text: message.text,
      createdAt: message.createdAt,
      user: { _id: message.user._id },
    });

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [message])
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={user ? { _id: user.uid, name: user.uid } : undefined}
    />
  );
}

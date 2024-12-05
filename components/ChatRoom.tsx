import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

import { db } from "@/constants/firebase";
import useUser from "@/hooks/use-user";
import UserAvatar from "./UserAvatar";

export default function ChatRoom() {
  const user = useUser();

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
        },
      },
    ]);
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
      showUserAvatar
      renderUsernameOnMessage
      renderAvatar={user ? () => <UserAvatar userUid={user.uid} /> : undefined}
    />
  );
}

import { addDoc, collection } from "firebase/firestore";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

import { db } from "@/constants/firebase";
import useMessages from "@/hooks/use-messages";
import useUser from "@/hooks/use-user";

export default function ChatRoom() {
  const user = useUser();

  const messages = useMessages();

  const onSend = async ([message]: IMessage[]) => {
    await addDoc(collection(db, "messages"), {
      text: message.text,
      createdAt: message.createdAt,
      user: { _id: message.user._id },
    });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={user ? { _id: user.uid, name: user.uid } : undefined}
    />
  );
}

import { addDoc, collection } from "firebase/firestore";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

import { db } from "@/constants/firebase";
import useAuth from "@/hooks/use-auth";
import useMessages from "@/hooks/use-messages";

export default function ChatRoom() {
  const { user: currentUser } = useAuth();

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
      user={
        currentUser
          ? { _id: currentUser.uid, name: currentUser.uid }
          : undefined
      }
    />
  );
}

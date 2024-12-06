import { addDoc, collection } from "firebase/firestore";
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  User,
} from "react-native-gifted-chat";

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

  const sender: User | undefined = currentUser
    ? { _id: currentUser.uid, name: currentUser.uid }
    : undefined;

  const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
    if (currentUser === null) {
      return null;
    }
    return <InputToolbar {...props} />;
  };

  return (
    <GiftedChat
      locale="id"
      messages={messages}
      onSend={onSend}
      user={sender}
      renderInputToolbar={renderInputToolbar}
      placeholder="Tulis pesan anda ..."
    />
  );
}

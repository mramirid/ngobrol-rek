import { addDoc, collection } from "firebase/firestore";
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  User,
} from "react-native-gifted-chat";
import { useTheme } from "react-native-paper";

import { db } from "@/constants/firebase";
import useAuth from "@/hooks/use-auth";
import useMessages from "@/hooks/use-messages";

export default function ChatRoom() {
  const { user: currentUser } = useAuth();

  const messages = useMessages();

  const onSend = async ([message]: IMessage[]) => {
    try {
      await addDoc(collection(db, "messages"), {
        text: message.text,
        createdAt: message.createdAt,
        user: { _id: message.user._id },
      });
    } catch (_) {
      alert("Gagal mengirim pesan anda");
    }
  };

  const theme = useTheme();

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
      listViewProps={{
        style: {
          backgroundColor: theme.colors.background,
        },
      }}
    />
  );
}

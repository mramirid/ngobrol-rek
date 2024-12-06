import { addDoc, collection } from "firebase/firestore";
import { useContext } from "react";
import {
  Avatar,
  AvatarProps,
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
import DialogContext from "./dialog/DialogContext";

export default function ChatRoom() {
  const { user: currentUser } = useAuth();

  const dialog = useContext(DialogContext);

  const onSend = async ([message]: IMessage[]) => {
    try {
      await addDoc(collection(db, "messages"), {
        text: message.text,
        createdAt: message.createdAt,
        user: { _id: message.user._id },
      });
    } catch (_) {
      dialog?.show("Error", "Gagal mengirim pesan anda");
    }
  };

  const messages = useMessages();

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
      renderAvatar={OtherUserAvatar}
    />
  );
}

function OtherUserAvatar(props: AvatarProps<IMessage>) {
  const dialog = useContext(DialogContext);

  const onPress = () => {
    dialog?.show("Info Pengguna", "ID: " + props.currentMessage.user._id);
  };

  return <Avatar {...props} onPressAvatar={onPress} />;
}

import { ReactNode, useState } from "react";
import { Dialog, Portal, Text } from "react-native-paper";

import DialogContext from "./DialogContext";

export default function DialogProvider(props: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState<string>();
  const [message, setMessage] = useState<string>();

  const hideDialog = () => {
    setVisible(false);
  };

  const showDialog = (title: string, message: string) => {
    setVisible(true);
    setTitle(title);
    setMessage(message);
  };

  return (
    <DialogContext.Provider value={{ show: showDialog }}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{message}</Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
      {props.children}
    </DialogContext.Provider>
  );
}

import { ReactNode, useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Avatar, Button, Dialog, Portal, Text } from "react-native-paper";

import useAuth from "@/hooks/use-auth";
import DialogContext from "../dialog/DialogContext";
import LoginPromptContext from "./LoginPromptContext";

export default function LoginPromptProvider(props: { children: ReactNode }) {
  const auth = useAuth();

  const [visible, setVisible] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const dialog = useContext(DialogContext);

  const login = async () => {
    setIsLoggingIn(true);

    try {
      await auth.login();
    } catch (error) {
      dialog?.show("Error", "Maaf, gagal menggabungkan anda ke dalam obrolan.");
      console.error(error);
    }

    setIsLoggingIn(false);
    hideDialog();
  };

  return (
    <LoginPromptContext.Provider value={{ show: showDialog }}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Icon icon="login" />
          <Dialog.Title style={styles.title}>Gabung Obrolan</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Gabung dan mulai mengobrol dengan yang lain 🙂
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} disabled={isLoggingIn}>
              Nanti
            </Button>
            <Button onPress={login} loading={isLoggingIn} mode="contained">
              Gabung
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {props.children}
    </LoginPromptContext.Provider>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});

function CardTitleIcon(props: any) {
  return <Avatar.Icon {...props} icon="login-variant" />;
}

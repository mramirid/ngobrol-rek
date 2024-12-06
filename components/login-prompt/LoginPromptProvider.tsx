import { ReactNode, useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Avatar, Button, Card, Modal, Portal } from "react-native-paper";

import useAuth from "@/hooks/use-auth";
import LoginPromptContext from "./LoginPromptContext";
import DialogContext from "../dialog/DialogContext";

export default function LoginPromptProvider(props: { children: ReactNode }) {
  const auth = useAuth();

  const [visible, setVisible] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const dialog = useContext(DialogContext);

  const login = async () => {
    setIsLoggingIn(true);

    try {
      await auth.login();
    } catch (error) {
      dialog?.show("Error", "Maaf, gagal menggabungkan anda ke dalam obrolan.");
    }

    setIsLoggingIn(false);
    hideModal();
  };

  return (
    <LoginPromptContext.Provider value={{ show: showModal }}>
      <Portal>
        <Modal
          visible={visible}
          dismissable={false}
          contentContainerStyle={styles.modalContentContainer}
        >
          <Card>
            <Card.Title
              title="Gabung Obrolan"
              subtitle="Gabung dan mulai mengobrol!"
              left={CardTitleIcon}
            />
            <Card.Actions>
              <Button onPress={hideModal} disabled={isLoggingIn}>
                Nanti
              </Button>
              <Button onPress={login} loading={isLoggingIn}>
                Gabung
              </Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
      {props.children}
    </LoginPromptContext.Provider>
  );
}

const styles = StyleSheet.create({
  modalContentContainer: {
    backgroundColor: "white",
    marginHorizontal: "10%",
    borderRadius: 10,
  },
});

function CardTitleIcon(props: any) {
  return <Avatar.Icon {...props} icon="login-variant" />;
}

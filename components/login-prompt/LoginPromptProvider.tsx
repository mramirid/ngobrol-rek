import { ReactNode, useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Avatar, Button, Card, Modal, Portal } from "react-native-paper";

import AuthContext from "../auth/AuthContext";
import LoginPromptContext from "./LoginPromptContext";

export default function LoginPromptProvider(props: { children: ReactNode }) {
  const auth = useContext(AuthContext);

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const login = async () => {
    try {
      await auth.login!();
    } catch (error) {
      alert("Maaf, gagal menggabungkan anda ke dalam obrolan.");
    }

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
              <Button onPress={hideModal}>Nanti</Button>
              <Button onPress={login}>Gabung</Button>
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

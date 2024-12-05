import { signInAnonymously } from "firebase/auth";
import { ReactNode, useState } from "react";
import { StyleSheet } from "react-native";
import { Avatar, Button, Card, Modal, Portal } from "react-native-paper";

import { auth } from "@/constants/firebase";
import LoginContext from "./LoginContext";

export default function LoginProvider(props: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const login = async () => {
    try {
      await signInAnonymously(auth);
      console.log("🚀 ~ login ~ Signed in");
    } catch (error) {
      alert("Maaf, gagal menggabungkan anda ke dalam obrolan.");
    }
  };

  return (
    <LoginContext.Provider value={{ prompt: showModal }}>
      <Portal>
        <Modal
          visible={visible}
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
    </LoginContext.Provider>
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

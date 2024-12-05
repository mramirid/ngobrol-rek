import { auth } from "@/constants/firebase";
import { signInAnonymously, User } from "firebase/auth";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Avatar, Button, Card, Modal, Portal } from "react-native-paper";

const CardTitleIcon = (props: any) => (
  <Avatar.Icon {...props} icon="login-variant" />
);

export default function LoginModal() {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const login = async () => {
    let user: User;

    try {
      ({ user } = await signInAnonymously(auth));
    } catch (error) {
      console.log("🚀 ~ login ~ error:", error);
      return;
    }

    console.log("🚀 ~ login ~ user:", user.uid);
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
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
      <Button style={{ marginTop: 30 }} onPress={showModal}>
        Show
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  modalContentContainer: {
    backgroundColor: "white",
    marginHorizontal: "10%",
    borderRadius: 10,
  },
});

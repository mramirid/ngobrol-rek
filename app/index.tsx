import { StyleSheet, Text, View } from "react-native";

import AppBar from "@/components/AppBar";
import LoginModal from "@/components/LoginModal";

export default function Index() {
  return (
    <>
      <AppBar />
      <View style={styles.screen}>
        <LoginModal />
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

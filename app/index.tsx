import { StyleSheet, Text, View } from "react-native";

import AppBar from "@/components/AppBar";
import LoginProvider from "@/components/login/LoginProvider";

export default function Index() {
  return (
    <LoginProvider>
      <AppBar />
      <View style={styles.screen}>
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </LoginProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { StyleSheet, Text, View } from "react-native";

import AppBar from "@/components/AppBar";
import AuthProvider from "@/components/auth/AuthProvider";
import LoginPromptProvider from "@/components/login-prompt/LoginPromptProvider";

export default function Index() {
  return (
    <AuthProvider>
      <LoginPromptProvider>
        <AppBar />
        <View style={styles.screen}>
          <Text>Edit app/index.tsx to edit this screen.</Text>
        </View>
      </LoginPromptProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { StyleSheet } from "react-native";

import AppBar from "@/components/AppBar";
import AuthProvider from "@/components/auth/AuthProvider";
import LoginPromptProvider from "@/components/login-prompt/LoginPromptProvider";
import ChatRoom from "@/components/ChatRoom";

export default function Index() {
  return (
    <AuthProvider>
      <LoginPromptProvider>
        <AppBar />
        <ChatRoom />
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

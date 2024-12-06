import { StyleSheet } from "react-native";

import AppBar from "@/components/AppBar";
import ChatRoom from "@/components/ChatRoom";
import LoginPromptProvider from "@/components/login-prompt/LoginPromptProvider";

export default function Index() {
  return (
    <LoginPromptProvider>
      <AppBar />
      <ChatRoom />
    </LoginPromptProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import AppBar from "@/components/AppBar";
import ChatRoom from "@/components/ChatRoom";
import KeyboardAvoider from "@/components/KeyboardAvoider";
import LoginPromptProvider from "@/components/login-prompt/LoginPromptProvider";

export default function Index() {
  return (
    <KeyboardAvoider>
      <LoginPromptProvider>
        <AppBar />
        <ChatRoom />
      </LoginPromptProvider>
    </KeyboardAvoider>
  );
}

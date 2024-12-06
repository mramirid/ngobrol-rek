import { useContext } from "react";
import { Appbar } from "react-native-paper";

import useAuth from "@/hooks/use-auth";
import LoginPromptContext from "./login-prompt/LoginPromptContext";
import UserAvatar from "./UserAvatar";

export default function AppBar() {
  const { user, logout } = useAuth();
  const userUid = user?.uid.toUpperCase();

  const loginPrompt = useContext(LoginPromptContext);

  return (
    <Appbar.Header elevated>
      <Appbar.Content title="Obrolan" />
      {user ? (
        <>
          <UserAvatar userUid={userUid!} />
          <Appbar.Action icon="logout" onPress={logout} />
        </>
      ) : (
        <Appbar.Action icon="login" onPress={loginPrompt!.show} />
      )}
    </Appbar.Header>
  );
}

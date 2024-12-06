import { useContext } from "react";
import { Appbar, Tooltip } from "react-native-paper";

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
          <Tooltip title={userUid!}>
            <UserAvatar userUid={userUid!} />
          </Tooltip>
          <Appbar.Action icon="logout" onPress={logout} />
        </>
      ) : (
        <Appbar.Action icon="login" onPress={loginPrompt!.show} />
      )}
    </Appbar.Header>
  );
}

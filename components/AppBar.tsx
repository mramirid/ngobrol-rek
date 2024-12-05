import { useContext } from "react";
import { Appbar, Avatar, Tooltip } from "react-native-paper";

import AuthContext from "./auth/AuthContext";
import LoginPromptContext from "./login-prompt/LoginPromptContext";

export default function AppBar() {
  const auth = useContext(AuthContext);
  const userUid = auth.user?.uid.toUpperCase();

  const loginPrompt = useContext(LoginPromptContext);

  return (
    <Appbar.Header>
      <Appbar.Content title="Obrolan" />
      {auth.user ? (
        <>
          <Tooltip title={userUid!}>
            <Avatar.Text size={24} label={userUid!.substring(0, 2)} />
          </Tooltip>
          <Appbar.Action icon="logout" onPress={auth.logout} />
        </>
      ) : (
        <Appbar.Action icon="login" onPress={loginPrompt!.show} />
      )}
    </Appbar.Header>
  );
}

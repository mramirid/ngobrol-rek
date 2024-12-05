import { useContext } from "react";
import { Appbar, Avatar, Tooltip } from "react-native-paper";

import AuthContext from "./auth/AuthContext";
import LoginPromptContext from "./login-prompt/LoginPromptContext";

export default function AppBar() {
  const auth = useContext(AuthContext);

  const loginPrompt = useContext(LoginPromptContext);

  return (
    <Appbar.Header>
      <Appbar.Content title="Obrolan" />
      {auth.user ? (
        <>
          <Tooltip title={auth.user!.uid}>
            <Avatar.Text
              size={24}
              label={auth.user!.uid.substring(0, 2).toUpperCase()}
            />
          </Tooltip>
          <Appbar.Action icon="logout" onPress={auth.logout} />
        </>
      ) : (
        <Appbar.Action icon="login" onPress={loginPrompt!.show} />
      )}
    </Appbar.Header>
  );
}

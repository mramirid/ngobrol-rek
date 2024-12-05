import { useContext } from "react";
import { Appbar } from "react-native-paper";

import AuthContext from "./auth/AuthContext";
import LoginContext from "./login/LoginContext";

export default function AppBar() {
  const auth = useContext(AuthContext);

  const login = useContext(LoginContext);

  return (
    <Appbar.Header>
      <Appbar.Content title="Obrolan" />
      {auth.user ? (
        <Appbar.Action icon="logout" onPress={() => {}} />
      ) : (
        <Appbar.Action icon="login" onPress={login?.prompt} />
      )}
    </Appbar.Header>
  );
}

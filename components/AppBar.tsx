import { auth } from "@/constants/firebase";
import { Appbar } from "react-native-paper";

export default function AppBar() {
  return (
    <Appbar.Header>
      <Appbar.Content title="Obrolan" />
      {auth.currentUser ? (
        <Appbar.Action icon="logout" onPress={() => {}} />
      ) : (
        <Appbar.Action icon="login" onPress={() => {}} />
      )}
    </Appbar.Header>
  );
}

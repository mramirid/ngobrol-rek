import { Avatar } from "react-native-paper";

export default function UserAvatar(props: { userUid: string }) {
  const initial = props.userUid.substring(0, 2).toUpperCase();

  return <Avatar.Text size={30} label={initial} />;
}

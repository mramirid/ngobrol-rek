import { Avatar, Tooltip } from "react-native-paper";

export default function UserAvatar(props: { userUid: string }) {
  const initial = props.userUid.substring(0, 2).toUpperCase();

  return (
    <Tooltip title={props.userUid}>
      <Avatar.Text size={30} label={initial} />
    </Tooltip>
  );
}

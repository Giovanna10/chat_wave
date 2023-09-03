import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { ChatFriend } from "../../../AppRoutes/PrivateArea/PrivateArea";
import { User } from "@firebase/auth";
interface FriendChatProps {
  selectedChat: ChatFriend;
  user: User;
}

const FriendChat: React.FunctionComponent<FriendChatProps> = ({
  selectedChat: { friends, messages },
  user,
}) => {
  return (
    <>
      <Typography>Friend</Typography>
      {messages.map(({ timestamp, message, incoming }, id) => (
        <Box key={id}>
          <ListItem>
            <ListItemAvatar></ListItemAvatar>
            <ListItemText>{message}</ListItemText>
          </ListItem>
        </Box>
      ))}
    </>
  );
};

export default FriendChat;

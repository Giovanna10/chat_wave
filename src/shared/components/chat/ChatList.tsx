import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Message } from "../../types";
import { useEffect, useState } from "react";
import { ChatFriend } from "../../../AppRoutes/PrivateArea/PrivateArea";
import { User } from "@firebase/auth";

interface ChatListProps {
  user: User;
  chatList: string[];
  users: User[];
  setSelectedChat: React.Dispatch<React.SetStateAction<ChatFriend | undefined>>;
}

const ChatList: React.FunctionComponent<ChatListProps> = ({
  user,
  chatList,
  users,
  setSelectedChat,
}) => {
  const [friendChats, setFriendChats] = useState<ChatFriend>();

  return (
    <>
      <Typography>Ciao {user.displayName}</Typography>
      {/* {friendChats ? (
        <List sx={{ mb: 2 }}>
          {remapChatList.map(({ friend, messages }) => (
            <ListItemButton
              onClick={() => setSelectedChat({ friend, messages })}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={friend.name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={friend.name}
                  secondary={messages[messages.length - 1].message}
                />
              </ListItem>
              <Divider />
            </ListItemButton>
          ))}
        </List>
      ) : (
        <Typography>Non ci sono messaggi</Typography>
      )} */}
    </>
  );
};

export default ChatList;

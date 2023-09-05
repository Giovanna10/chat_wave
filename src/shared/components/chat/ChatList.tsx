import { Avatar, List, ListItem, ListItemAvatar } from "@mui/material";
import { useAuthState } from "../../../firebase/hooks";
import { useChatUsers } from "../../../firebase/hooks/user";
import { ChatPreview } from "./ChatPreview";

export const ChatList = () => {
  const [chatUsers, _isLoading] = useChatUsers();
  const [currentUser] = useAuthState();

  if (!currentUser) {
    throw new Error("User is not logged in");
  }

  const chatUsersExceptMe = chatUsers?.filter(
    (user) => user.id !== currentUser.uid
  );

  return (
    <List>
      {chatUsersExceptMe?.map((user) => (
        <ListItem>
          <ChatPreview
            chatUserId={user.id}
            chatUserName={user.name}
            currentUserId={currentUser.uid}
          >
            <ListItemAvatar>
              <Avatar alt={user.name} src={user.avatar} />
            </ListItemAvatar>
          </ChatPreview>
        </ListItem>
      ))}
    </List>
  );
};

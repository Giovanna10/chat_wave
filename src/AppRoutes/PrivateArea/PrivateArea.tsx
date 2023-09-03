import { User } from "@firebase/auth";
import { Box, Typography } from "@mui/material";
import { Message } from "../../shared/types";

export type ChatFriend = {
  friends: User[];
  messages: Message[];
};

interface PrivateAreaProps {}

const PrivateArea: React.FunctionComponent<PrivateAreaProps> = ({}) => {
  return (
    <Box>
      <Typography>Private area</Typography>
      {/* <Chat
        selectedChat={selectedChat}
        header={<ChatHeader user={user} logout={logout} />}
        chatList={
          <></>
          // <ChatList
          //   chatList={chats.chatList}
          //   users={users}
          //   user={user}
          //   setSelectedChat={setSelectedChat}
          // />
        }
        selectedFriendChat={
          <></>
          // selectedChat ? (
          //   <FriendChat user={user} selectedChat={selectedChat} />
          // ) : undefined
        }
      /> */}
    </Box>
  );
};

export default PrivateArea;

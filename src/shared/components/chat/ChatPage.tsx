import {
  AppBar,
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import { useAuthState } from "../../../firebase/hooks";
import { getChatMessages, useChatMessages } from "../../../firebase/hooks/chat";
import { getUserUniqueIds } from "../../utils";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useChatUsersByParticipants } from "../../../firebase/hooks/user";
import { ChatSend } from "./ChatSend";
const ChatPage = () => {
  const params = useParams();

  if (!params.id) return null;

  return (
    <Box position="relative">
      <Chat id={params.id} />
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 340,
          width: "calc(100% - 340px)",
          zIndex: 1,
        }}
      >
        <ChatSend chatId={params.id} />
      </Box>
    </Box>
  );
};

type ChatProps = PropsWithChildren<{
  id: string;
}>;

const Chat = (props: ChatProps) => {
  const [messages = [], isLoading] = useChatMessages(props.id);
  const uniqueIds = getUserUniqueIds(messages) as string[] | undefined;

  if (isLoading || !uniqueIds || uniqueIds?.length === 0) return null;

  return (
    <Box
      sx={{
        width: "calc(100% - 340px)",
        marginTop: 10,
        marginBottom: 14,
        marginLeft: "auto",
        height: "calc(100vh - 50px)",
      }}
    >
      {/* <button onClick={onClick}>load more</button> */}
      <ChatProvider userIds={uniqueIds}>
        {messages.map((message) => (
          <ChatConversation
            key={message.id}
            userId={message.userId}
            message={message.text}
          />
        ))}
      </ChatProvider>
    </Box>
  );
};

const ChatContext = createContext<
  | {
      users: ReturnType<typeof useChatUsersByParticipants>["0"];
      isLoading: boolean;
    }
  | undefined
>(undefined);

const ChatProvider = (props: PropsWithChildren<{ userIds: string[] }>) => {
  const [users, isLoading] = useChatUsersByParticipants(props.userIds);

  const values = useMemo(() => ({ users, isLoading }), [users, isLoading]);

  return (
    <ChatContext.Provider value={values}>{props.children}</ChatContext.Provider>
  );
};

const useChatUser = (userId: string) => {
  const context = useContext(ChatContext);

  if (!context) throw new Error("useChatUser must be used within ChatProvider");
  console.log(context);
  return context.users?.find((user) => user.id === userId);
};

const ChatConversation = (props: { userId: string; message: string }) => {
  const [currentUser] = useAuthState();
  const user = useChatUser(props.userId);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent:
          props.userId === currentUser?.uid ? "flex-end" : "flex-start",
      }}
    >
      <ListItem
        sx={{
          width: "fit-content",
        }}
      >
        <ListItemAvatar>
          <Avatar alt={user?.email} src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText>{props.message}</ListItemText>
      </ListItem>
    </Box>
  );
};

export default ChatPage;

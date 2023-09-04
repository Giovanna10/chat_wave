import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useParams } from "react-router";
import { useAuthState } from "../../../firebase/hooks";
import { useChatMessages } from "../../../firebase/hooks/chat";
import { useChatUsersByParticipants } from "../../../firebase/hooks/user";
import { getUserUniqueIds } from "../../utils";
import { ChatSend } from "./ChatSend";
import { useMobile } from "../../hooks/useMobile";
const ChatPage = () => {
  const { isMobile } = useMobile();
  const params = useParams();

  if (!params.id) return null;

  return (
    <Box position="relative">
      <Chat id={params.id} />
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: isMobile ? 0 : 340,
          width: isMobile ? "100%" : "calc(100% - 340px)",
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
  const { isMobile } = useMobile();
  const [messages = [], isLoading] = useChatMessages(props.id);
  const uniqueIds = getUserUniqueIds(messages) as string[] | undefined;

  if (isLoading || !uniqueIds || uniqueIds?.length === 0) return null;

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : "calc(100% - 340px)",
        marginTop: 10,
        marginBottom: 2,
        marginLeft: "auto",
      }}
    >
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

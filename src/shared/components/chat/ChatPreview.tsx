import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import { createEmptyChats } from "../../../firebase/database/chat";
import { useChat, useLastMessage } from "../../../firebase/hooks/chat";

type ChatPreviewMessageTextProps = {
  chatId: string;
  chatUserName: string;
};

export const ChatPreviewMessageText = (props: ChatPreviewMessageTextProps) => {
  const lastMessage = useLastMessage(props.chatId);

  return <ListItemText primary={props.chatUserName} secondary={lastMessage} />;
};

type ChatPreviewProps = {
  chatUserName: string;
  chatUserId: string;
  currentUserId: string;
};

export const ChatPreview = (props: PropsWithChildren<ChatPreviewProps>) => {
  const navigate = useNavigate();
  const chats = useChat([props.currentUserId, props.chatUserId]);

  if (chats && chats[0]) {
    return (
      <ListItemButton onClick={() => navigate(`/${chats[0].id}`)}>
        <ListItem alignItems="flex-start">
          {props.children}
          <ChatPreviewMessageText
            chatUserName={props.chatUserName}
            chatId={chats[0].id}
          />
        </ListItem>
      </ListItemButton>
    );
  }
  return (
    <ListItemButton
      onClick={() => {
        createEmptyChats([props.currentUserId, props.chatUserId]).then(
          (chat) => {
            navigate(`/${chat.id}`);
          }
        );
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemText primary={props.chatUserName} secondary={""} />
      </ListItem>
    </ListItemButton>
  );
};

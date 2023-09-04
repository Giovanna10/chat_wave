import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router";
import { useChat, useLastMessage } from "../../../firebase/hooks/chat";
import { PropsWithChildren } from "react";
import { createEmptyChats } from "../../../firebase/database/chat";

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
  const chat = useChat([props.currentUserId, props.chatUserId]);

  if (chat && chat[0]) {
    return (
      <ListItemButton onClick={() => navigate(`/${chat[0].id}`)}>
        <ListItem alignItems="flex-start">
          {props.children}
          <ChatPreviewMessageText
            chatUserName={props.chatUserName}
            chatId={chat[0].id}
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

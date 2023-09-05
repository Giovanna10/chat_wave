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
  const sortedParticipants = [props.currentUserId, props.chatUserId].sort() as [
    string,
    string
  ];
  const chatCollection = useChat(sortedParticipants);

  if (chatCollection && chatCollection[0]) {
    return (
      <ListItemButton onClick={() => navigate(`/${chatCollection[0].id}`)}>
        <ListItem alignItems="flex-start">
          {props.children}
          <ChatPreviewMessageText
            chatUserName={props.chatUserName}
            chatId={chatCollection[0].id}
          />
        </ListItem>
      </ListItemButton>
    );
  }
  return (
    <ListItemButton
      onClick={() => {
        createEmptyChats(sortedParticipants).then((chat) => {
          navigate(`/${chat.id}`);
        });
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemText primary={props.chatUserName} secondary={""} />
      </ListItem>
    </ListItemButton>
  );
};

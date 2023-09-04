import { Box, Button } from "@mui/material";
import { useAuthState } from "../../../firebase/hooks";
import { useState } from "react";
import { sendMessage } from "../../../firebase/hooks/chat";

type ChatSendProps = {
  chatId: string;
};

export const ChatSend = (props: ChatSendProps) => {
  const [user] = useAuthState();
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!user) throw new Error("User not found");
    sendMessage(props.chatId, { userId: user?.uid, text });
    setText("");
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "white" }}>
      <textarea
        style={{ width: "100%" }}
        value={text}
        onChange={(evt) => setText(evt.target.value)}
      />
      <Button onClick={handleSend}>Send</Button>
    </Box>
  );
};

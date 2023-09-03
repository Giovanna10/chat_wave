import { ReactElement } from "react";
import { Message } from "../../types";
import { ChatFriend } from "../../../AppRoutes/PrivateArea/PrivateArea";

interface ChatProps {
  header: ReactElement;
  chatList: ReactElement;
  selectedFriendChat?: ReactElement;
  selectedChat?: ChatFriend;
}

const Chat: React.FunctionComponent<ChatProps> = ({
  header,
  chatList,
  selectedFriendChat,
  selectedChat,
}) => {
  return (
    <>
      {header}
      {selectedFriendChat ?? chatList}
    </>
  );
};

export default Chat;

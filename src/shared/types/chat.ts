export type Message = {
  timestamp: string;
  message: string;
  incoming?: boolean;
  chatId: string;
};

export type Chat = {
  id: string;
  chatList: string[];
};

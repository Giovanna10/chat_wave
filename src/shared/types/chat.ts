import { Timestamp } from "@firebase/firestore";

export type Message = {
  id: string;
  userId: string;
  text: string;
  timestamp: Timestamp;
};

export type Chat = {
  id: string;
  participants: string[];
  messages: Message[];
};

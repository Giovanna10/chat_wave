import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
  addDoc,
  collection,
  limit,
  orderBy,
  query,
} from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Message } from "../../shared/types";
import { appDb } from "../database";
import { getChatCollectionByParticipants } from "../database/chat";

const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore(data: WithFieldValue<Message>): DocumentData {
    return data;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<Message>,
    options: SnapshotOptions
  ): Message {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id };
  },
};

const getLastMessageByChatId = (chatId: string) => {
  const messageCollectionRef = collection(
    appDb,
    "chats",
    chatId,
    "messages"
  ).withConverter(messageConverter);
  const querySnapshot = query(
    messageCollectionRef,
    orderBy("timestamp", "desc"),
    limit(1)
  );
  return querySnapshot;
};

export const getChatMessages = (chatId: string, lastMessageId?: string) => {
  const messageCollectionRef = collection(
    appDb,
    "chats",
    chatId,
    "messages"
  ).withConverter(messageConverter);
  const querySnapshot = query(messageCollectionRef, orderBy("timestamp"));
  return querySnapshot;
};

export const sendMessage = async (
  chatId: string,
  message: { text: string; userId: string }
) => {
  try {
    const chat = collection(appDb, "chats", chatId, "messages");
    await addDoc(chat, { ...message, timestamp: new Date() });
  } catch (err) {
    console.log(err);

    throw new Error("Non sono riuscito ad inviare il messaggio");
  }
};

export const useChat = (participants: [string, string]) => {
  const querySnapshot = getChatCollectionByParticipants(participants);
  const chatCollection = useCollectionData(querySnapshot);

  return chatCollection[0];
};

export const useLastMessage = (chatId: string) => {
  const messagesCollection = useCollectionData(getLastMessageByChatId(chatId));

  return messagesCollection[0] && messagesCollection[0][0]
    ? messagesCollection[0][0].text
    : "";
};

export const useChatMessages = (chatId: string, lastMessageId?: string) => {
  const messagesCollection = useCollectionData(getChatMessages(chatId));

  return messagesCollection;
};

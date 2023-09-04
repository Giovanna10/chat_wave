import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
  addDoc,
  collection,
  query,
  where,
} from "@firebase/firestore";
import { Chat } from "../../shared/types/chat";
import { appDb } from "./common";

const chatConverter: FirestoreDataConverter<Chat> = {
  toFirestore(data: WithFieldValue<Chat>): DocumentData {
    return data;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<Chat>,
    options: SnapshotOptions
  ): Chat {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id };
  },
};

export const getChatCollectionByParticipants = (
  participants: [string, string]
) => {
  const chatCollectionRef = collection(appDb, "chats").withConverter(
    chatConverter
  );

  return query(
    chatCollectionRef,
    where("participants", "in", [participants.sort()])
  );
};

export const createEmptyChats = async (participants: [string, string]) => {
  try {
    return await addDoc(collection(appDb, "chats"), {
      participants,
    });
  } catch (err) {
    throw new Error("Non sono riuscito a creare l'oggetto chats");
  }
};

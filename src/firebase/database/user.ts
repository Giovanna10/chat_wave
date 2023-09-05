import {
  DocumentData,
  FirestoreDataConverter,
  WithFieldValue,
  collection,
  SnapshotOptions,
  QueryDocumentSnapshot,
  query,
  where,
  setDoc,
  doc,
  or,
} from "@firebase/firestore";
import { appDb } from "./common";

export type ChatUser = {
  avatar: string;
  email: string;
  id: string;
  name: string;
};

const userConverter: FirestoreDataConverter<ChatUser> = {
  toFirestore(user: WithFieldValue<ChatUser>): DocumentData {
    return {
      avatar: user.avatar,
      email: user.email,
      id: user.id,
      name: user.name,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ChatUser {
    const data = snapshot.data(options);
    return {
      avatar: data.author,
      id: snapshot.id,
      email: data.email,
      name: data.name,
    };
  },
};

export const usersCollection = collection(appDb, "users").withConverter(
  userConverter
);

export const getUsersCollectionByParticipants = (partecipants: string[]) => {
  return query(
    usersCollection,
    or(...partecipants.map((p) => where("id", "==", p)))
  );
};

export const createUser = async (
  userId: string,
  name: string,
  email: string,
  avatar: string
) => {
  try {
    await setDoc(doc(appDb, "users", userId), {
      id: userId,
      name,
      email,
      avatar,
    });
  } catch (err) {
    throw new Error("Non sono riuscito a creare l'oggetto utente");
  }
};

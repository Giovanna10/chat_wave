import { usersCollection } from "../database/user";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getUsersCollectionByParticipants } from "../database/user";

export const useChatUsers = () => {
  return useCollectionData(usersCollection);
};

export const useChatUsersByParticipants = (participants: string[]) => {
  return useCollectionData(getUsersCollectionByParticipants(participants));
};

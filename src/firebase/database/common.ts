import { getFirestore } from "firebase/firestore";
import firebaseApp from "..";

export const appDb = getFirestore(firebaseApp);

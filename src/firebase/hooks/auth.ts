import {
  useSignInWithEmailAndPassword,
  useSignOut as useFirebaseSignOut,
  useCreateUserWithEmailAndPassword,
  useAuthState as useFirebaseAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "../authentication";

export const useAuthState = () => useFirebaseAuthState(auth);

export const useSignIn = () => {
  return useSignInWithEmailAndPassword(auth);
};

export const useSignOut = () => {
  return useFirebaseSignOut(auth);
};

export const useRegister = () => {
  return useCreateUserWithEmailAndPassword(auth);
};

import { useState } from "react";
import { useUsers } from "../api";
import { User } from "../types";

export const useAuth = () => {
  const { users } = useUsers();
  const [user, setUser] = useState<User>();

  const login = async (email: string) => {
    const currentUser = users?.find((user) => user.email === email);

    if (currentUser) {
      return currentUser;
    } else {
      throw new Error(
        "Non é stato trovato nessun account legato a questa mail"
      );
    }
  };

  const logout = () => {
    setUser(undefined);
  };

  return { user, setUser, login, logout };
};

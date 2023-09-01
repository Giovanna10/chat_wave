import { useEffect, useState } from "react";
import { User } from "../types";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const getData = () => {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/users", requestOptions)
      .then((response) => response.json())
      .then((result) => setUsers(result))
      .catch((error) => console.log("error", error));
  };
  const createAccount = async (body: User) => {
    const requestOptions: RequestInit = {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    return await fetch(`http://localhost:3030/users`, requestOptions)
      .then((response) => response.json())
      .then((result: User) => {
        setUsers([result, ...users]);
        return result;
      })
      .catch(() => {
        throw new Error("Errore nella creazione dell'account");
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return { users, createAccount };
};

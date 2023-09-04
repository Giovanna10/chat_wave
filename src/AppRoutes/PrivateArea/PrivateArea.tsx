import { User } from "@firebase/auth";
import { Box } from "@mui/material";
import { FC } from "react";
import {} from "react-firebase-hooks/database";
import { Outlet } from "react-router";
import { ChatList } from "../../shared/components/chat/ChatList";
import Layout from "../../shared/components/layout";

interface PrivateAreaProps {
  user: User;
}

const PrivateArea: FC<PrivateAreaProps> = ({ user }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Outlet />
      <Layout user={user} chatList={<ChatList />} />
    </Box>
  );
};

export default PrivateArea;

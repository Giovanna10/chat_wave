import { Box } from "@mui/material";
import {} from "react-firebase-hooks/database";
import { Outlet } from "react-router";
import { ChatList } from "../../shared/components/chat/ChatList";
import Layout from "../../shared/components/layout";

const PrivateArea = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Outlet />
      <Layout chatList={<ChatList />} />
    </Box>
  );
};

export default PrivateArea;

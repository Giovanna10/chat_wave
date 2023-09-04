import { User } from "@firebase/auth";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Button, Divider, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { FC, ReactElement, useState } from "react";
import { useSignOut } from "../../../firebase/hooks";

const drawerWidth = 340;

interface LayoutProps {
  user: User;
  chatList: ReactElement;
  window?: () => Window;
}

const Layout: FC<LayoutProps> = ({ user, chatList, window }) => {
  const [signOut] = useSignOut();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar>
            <Avatar alt={user.email ?? ""} src="/static/images/avatar/2.jpg" />
            <Typography>{user.email}</Typography>
            <Button onClick={() => signOut()}>Logout</Button>
          </Toolbar>
          <Divider />
          <Box sx={{ marginTop: 2, marginLeft: 4 }}>
            <Typography variant="h6">CHATS</Typography>
          </Box>
          {chatList}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Toolbar>
            <Avatar alt={user.email ?? ""} src="/static/images/avatar/2.jpg" />
            <Typography>{user.email}</Typography>
            <Button onClick={() => signOut()}>Logout</Button>
          </Toolbar>
          <Divider />
          <Box sx={{ marginTop: 2, marginLeft: 4 }}>
            <Typography variant="h6">CHATS</Typography>
          </Box>
          {chatList}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Layout;

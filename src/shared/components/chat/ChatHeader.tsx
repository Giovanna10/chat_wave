import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import { User } from "@firebase/auth";

interface ChatHeaderProps {
  user: User;
  logout: () => void;
}

const settings = ["Logout"];

const ChatHeader: React.FunctionComponent<ChatHeaderProps> = ({
  user,
  logout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleOpenUserMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 0 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography>Chat Wave</Typography>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={user.displayName ?? ""}
                src="/static/images/avatar/2.jpg"
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={isMenuOpen}
          >
            <MenuItem>
              <ListItemText>Ciao {user.displayName}</ListItemText>
            </MenuItem>
            <Divider />
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader;

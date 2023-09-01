import { Box } from "@mui/material";
import LoginForm from "../shared/components/LoginForm";
import { useAuth } from "../shared/hooks";
import PrivateArea from "./PrivateArea";
import { useState } from "react";
import RegistrationForm from "../shared/components/RegistrationForm";

interface AppRoutesProps {}

const AppRoutes: React.FunctionComponent<AppRoutesProps> = () => {
  const { user, setUser, login } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Box>
      {user ? (
        <PrivateArea />
      ) : isAuthenticated ? (
        <LoginForm
          setUser={setUser}
          login={login}
          setIsAuthenticated={setIsAuthenticated}
        />
      ) : (
        <RegistrationForm
          setUser={setUser}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
    </Box>
  );
};

export default AppRoutes;

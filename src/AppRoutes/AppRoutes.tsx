import { Route, Routes } from "react-router";
import { useAuthState } from "../firebase/hooks";
import LoginForm from "../shared/components/LoginForm";
import RegistrationForm from "../shared/components/RegistrationForm";
import PrivateArea from "./PrivateArea";
import ChatPage from "../shared/components/chat/ChatPage";

const AppRoutes = () => {
  const [user, _isLoading] = useAuthState();

  return (
    <>
      {user ? (
        <Routes>
          <Route path="/" element={<PrivateArea user={user} />}>
            <Route path="/:id" element={<ChatPage />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;

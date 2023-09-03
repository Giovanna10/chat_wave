import { Route, Routes } from "react-router";
import { useAuthState } from "../firebase/hooks";
import LoginForm from "../shared/components/LoginForm";
import RegistrationForm from "../shared/components/RegistrationForm";
import PrivateArea from "./PrivateArea";

interface AppRoutesProps {}

const AppRoutes: React.FunctionComponent<AppRoutesProps> = () => {
  const [user, _isLoading] = useAuthState();

  return (
    <>
      {user ? (
        <Routes>
          <Route path="/" element={<PrivateArea />} />
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

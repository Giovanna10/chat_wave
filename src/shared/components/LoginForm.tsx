import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { User } from "../types";

type UserForm = { email: string };

interface LoginFormProps {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  login: (email: string) => Promise<User>;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  setIsAuthenticated,
  login,
  setUser,
}) => {
  const [mexNoMailFound, setMexNoMailFound] = useState("");
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: yupResolver(
      yup.object({
        email: yup.string().required("Inserisci la mail"),
      })
    ),
  });

  const onSubmit = (data: UserForm) => {
    login(data.email)
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        setMexNoMailFound(err.message);
        setError("email", {
          message: "Email non trovata",
        });
      });
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {errors.email ? (
        <Alert
          sx={{
            position: "absolute",
            top: 20,
            left: 0,
          }}
          severity="warning"
          action={
            <Button onClick={() => setIsAuthenticated(false)} size="small">
              Crea
            </Button>
          }
        >
          <AlertTitle>Attenzione</AlertTitle>
          {mexNoMailFound}
        </Alert>
      ) : null}
      <FormGroup sx={{ rowGap: 3 }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              color="primary"
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <TextField color="primary" label="Password" type="password" />
        <Button variant="contained" type="submit">
          Accedi
        </Button>
      </FormGroup>
      <Typography>Non hai un account?</Typography>
      <Button variant="text" onClick={() => setIsAuthenticated(false)}>
        Crea
      </Button>
    </Box>
  );
};

export default LoginForm;

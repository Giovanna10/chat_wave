import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormGroup, TextField, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useUsers } from "../api";
import { User } from "../types";
import { getRandomId } from "../utils/getRandomId";

type UserForm = { name: string; email: string };

interface RegistrationFormProps {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const RegistrationForm: React.FunctionComponent<RegistrationFormProps> = ({
  setIsAuthenticated,
  setUser,
}) => {
  const { createAccount } = useUsers();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: yupResolver(
      yup.object({
        name: yup.string().required("Inserisci il nome"),
        email: yup.string().required("Inserisci la mail"),
      })
    ),
  });

  const onSubmit = (data: UserForm) => {
    createAccount({
      id: getRandomId(),
      name: data.name,
      email: data.email,
    }).then((createdUser) => setUser(createdUser));
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup sx={{ rowGap: 3 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="primary"
              label="Nome"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="primary"
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <TextField color="primary" label="Password" type="password" />
        <Button variant="contained" type="submit">
          Registrati
        </Button>
      </FormGroup>
      <Typography>Hai giá un account?</Typography>
      <Button variant="text" onClick={() => setIsAuthenticated(true)}>
        Accedi
      </Button>
    </Box>
  );
};

export default RegistrationForm;

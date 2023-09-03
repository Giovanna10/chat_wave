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
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useSignIn } from "../../firebase/hooks";

const userSchema = yup.object({
  email: yup.string().required("Inserisci la mail"),
  password: yup.string().required("Inserisci la password"),
});

type UserForm = yup.InferType<typeof userSchema>;

const LoginForm = () => {
  const [signIn, _userCredential, _loading, errorAuth] = useSignIn();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = ({ email, password }: UserForm) => {
    signIn(email, password);
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box marginBottom={3}>
        {errorAuth?.message ? (
          <Alert severity="error">
            <AlertTitle>Attenzione</AlertTitle>
            {errorAuth?.message}
          </Alert>
        ) : null}
      </Box>
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
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              color="primary"
              label="Password"
              type="password"
            />
          )}
        />
        <Button variant="contained" type="submit">
          Accedi
        </Button>
      </FormGroup>
      <Typography>Non hai un account?</Typography>
      <Link to="/register">
        <Button variant="text">Crea</Button>
      </Link>
    </Box>
  );
};

export default LoginForm;

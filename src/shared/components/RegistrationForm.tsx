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
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { createUser } from "../../firebase/database/user";
import { useRegister } from "../../firebase/hooks";
import { updateProfile } from "@firebase/auth";

const registrationSchema = yup.object({
  name: yup.string().required("Inserisci il nome"),
  email: yup.string().required("Inserisci la mail"),
  password: yup.string().required("Inserisci la password"),
});

type UserForm = yup.InferType<typeof registrationSchema>;

const RegistrationForm = () => {
  const [register, _userCredential, _loading, errorReg] = useRegister();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = ({ email, password, name }: UserForm) => {
    register(email, password).then((userCredential) => {
      if (userCredential) {
        console.log(userCredential);

        updateProfile(userCredential.user, {
          displayName: name,
          photoURL: "/static/images/avatar/2.jpg",
        })
          .then(() => {
            createUser(userCredential.user.uid, name, email, "");
          })
          .catch((error) => {
            console.log({ error });

            throw new Error("Error in profile updating");
          });
      }
      navigate("/");
    });
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box marginBottom={3}>
        {errorReg?.message ? (
          <Alert severity="error">
            <AlertTitle>Attenzione</AlertTitle>
            {errorReg?.message}
          </Alert>
        ) : null}
      </Box>
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
          Registrati
        </Button>
      </FormGroup>
      <Typography>Hai giá un account?</Typography>
      <Link to="/">
        <Button variant="text">Accedi</Button>
      </Link>
    </Box>
  );
};

export default RegistrationForm;

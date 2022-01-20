import { useState, useEffect } from "react";
import { useCreateNewUserMutation } from "../redux/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Box,
} from "@mui/material";

export default function SignupView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createNewUser, { isSuccess, isError, error }] =
    useCreateNewUserMutation();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isSuccess) {
      navigate("/signin");
      enqueueSnackbar("Registration succes, please signin", {
        variant: "success",
      });
    }
  });

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(error.data.message, {
        variant: "error",
      });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createNewUser({
      name,
      email,
      password,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "email":
        setEmail(value);
        break;

      case "password":
        setPassword(value);
        break;

      default:
        return;
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: "25vh" }}>
          <Typography component="h1" variant="h5" color="primary">
            Signup
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="standard"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Signup
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
}

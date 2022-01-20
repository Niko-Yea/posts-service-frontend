import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSiginUserMutation } from "../redux/auth/authApi";
import { login } from "../redux/auth/authSlice";
import { Link } from "react-router-dom";

import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Box,
} from "@mui/material";

export default function SigninView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [signinUser] = useSiginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await signinUser({ email, password });
      if (loginResponse.data) {
        dispatch(login(loginResponse.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
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
            Signin
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Signin
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
}

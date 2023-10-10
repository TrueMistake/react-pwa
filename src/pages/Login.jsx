import React, {useRef} from 'react';
import Input from "../components/Input/Input.jsx";
import {useAuth} from "../context/AuthProvider.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography} from "@mui/material";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef({
    login: '',
    password: ''
  });

  const from = location.state?.from || '/';

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    formRef.current = {
      login: data.get('login'),
      password: data.get('password'),
    }

    auth.singIn(formRef.current, () => {
      navigate(from, {
        replace: true
      });
    })
  };


  return (
    <>
      <Typography component="h1" variant="h5" align="center">
        Авторизоваться
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="login"
          label="Логин"
          name="login"
          autoComplete="text"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Войти
        </Button>
      </Box>
    </>
  );
};

export default Login;
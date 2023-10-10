import React from 'react';
import {useAuth} from "../../context/AuthProvider.jsx";
import {Link, useNavigate} from "react-router-dom";
import './style.css'
import {Button, Typography} from "@mui/material";

const AuthStatus = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSingout = () => {
    auth.singOut(() => {
      navigate('/');
    })
  }

  if (auth?.user === null) {
    return <div className="welcome">
            <Typography variant="body1" gutterBottom><strong>Вы не авторизованы</strong></Typography>
            <Button href="/login" variant="outlined" sx={{ mt: 3, mb: 2 }}>Войти</Button>
          </div>
  }

  return (
    <div className="welcome">
      <Typography variant="body1" gutterBottom>Добро пожаловать, <strong>{auth?.user?.login}</strong></Typography>
      <Button variant="outlined" sx={{ mt: 3, mb: 2 }} onClick={handleSingout}>Выйти</Button>
    </div>
  );
};

export default AuthStatus;
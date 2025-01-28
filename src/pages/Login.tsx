import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <Box className="flex justify-center items-center h-screen w-screen bg-gray-50 px-4">
      <Paper className="p-8 shadow-lg w-full max-w-md">
        <Typography variant="h4" align="center" className="mb-6">
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <TextField label="Correo" variant="outlined" fullWidth required />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Entrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;

import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula un registro exitoso y redirige
    navigate("/emails-form");
  };

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Typography variant="h4" className="mb-4">
        Registro
      </Typography>
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
        <TextField label="Correo" variant="outlined" fullWidth required />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Registrarse
        </Button>
      </form>
    </Box>
  );
};

export default Register;

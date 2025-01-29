import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { register } from "../services/authService"; // Importamos el servicio de autenticación

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await register(
        formData.username,
        formData.email,
        formData.password,
        formData.phone
      );

      if (response.status === 201) {
        // Redirige a la página de verificación de email
        navigate("/emailsform");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al registrarse.");
    }
  };

  return (
    <Box className="flex justify-center items-center h-screen w-screen bg-gray-50 px-4">
      <Paper className="p-8 shadow-lg w-full max-w-md">
        <Typography variant="h4" align="center" className="mb-6">
          Registro
        </Typography>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <TextField
            label="Nombre de Usuario"
            name="username"
            variant="outlined"
            fullWidth
            required
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label="Correo"
            name="email"
            variant="outlined"
            fullWidth
            required
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            label="Número de Teléfono"
            name="phone"
            type="tel"
            variant="outlined"
            fullWidth
            required
            value={formData.phone}
            onChange={handleChange}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Registrarse
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;

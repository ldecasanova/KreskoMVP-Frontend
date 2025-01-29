import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { register } from "../services/authService"; // Importar el servicio

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register(form.username, form.email, form.password, form.phone);
      localStorage.setItem("userId", response.data.userId); // Guardar ID del usuario para verificar código
      alert("Registro exitoso. Verifica tu teléfono.");
      navigate("/emailsform"); // Redirige a la siguiente pantalla
    } catch (error) {
      alert("Error al registrarse.");
    }
  };

  return (
    <Box className="flex justify-center items-center h-screen w-screen bg-gray-50 px-4">
      <Paper className="p-8 shadow-lg w-full max-w-md">
        <Typography variant="h4" align="center" className="mb-6">
          Registro
        </Typography>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <TextField label="Usuario" name="username" variant="outlined" fullWidth required onChange={handleChange} />
          <TextField label="Correo" name="email" variant="outlined" fullWidth required onChange={handleChange} />
          <TextField label="Contraseña" name="password" type="password" variant="outlined" fullWidth required onChange={handleChange} />
          <TextField label="Número de teléfono" name="phone" variant="outlined" fullWidth required onChange={handleChange} />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Registrarse
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;

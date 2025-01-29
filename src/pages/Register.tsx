import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { register } from "../services/authService"; // Servicio para conectar con el backend

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validación de correo y teléfono
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\d{9,15}$/.test(phone);

  // Manejar envío del formulario
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validaciones antes de enviar
    if (!validateEmail(formData.email)) {
      setError("El correo no es válido.");
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError("El número de teléfono debe tener entre 9 y 15 dígitos.");
      return;
    }

    setLoading(true);
    try {
      const response = await register(
        formData.username,
        formData.email,
        formData.password,
        formData.phone
      );

      if (response.status === 201) {
        navigate("/emailsform");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al registrarse.");
    } finally {
      setLoading(false);
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper, TextField } from "@mui/material";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box className="flex h-screen w-screen">
      {/* Lado Izquierdo - Fondo con Imagen */}
      <Box
        className="hidden md:flex w-1/2 justify-center items-center"
        style={{
          backgroundImage: "url('/hero-image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
      </Box>

      {/* Lado Derecho - Registro */}
      <Box className="w-full md:w-1/2 flex justify-center items-center px-4 bg-gray-50">
        <Paper className="p-8 shadow-lg w-full max-w-md">
          <Typography variant="h4" align="center" className="mb-6">
            Registro
          </Typography>
          <form className="flex flex-col gap-4">
            <TextField label="Correo" variant="outlined" fullWidth required />
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              required
            />
            <Button variant="contained" color="primary" fullWidth>
              Registrarse
            </Button>
            <Typography align="center" className="mt-4">
              ¿Ya tienes cuenta?{" "}
              <Button color="primary" onClick={() => navigate("/login")}>
                Iniciar sesión
              </Button>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Home;

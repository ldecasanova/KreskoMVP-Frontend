import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Paper } from "@mui/material";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box className="flex h-screen w-screen">
      {/* Lado Izquierdo - Imagen de fondo */}
      <Box
        className="hidden md:flex w-1/2 justify-center items-center"
        style={{
          backgroundImage: "url('/hero-image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#4A90E2", // Color de respaldo
        }}
      ></Box>

      {/* Lado Derecho - Contenido */}
      <Box className="w-full md:w-1/2 flex justify-center items-center px-10 bg-gray-50">
        <Paper className="p-16 shadow-2xl w-full max-w-lg text-center rounded-3xl">
          <Typography
            variant="h3"
            className="mb-8 font-extrabold tracking-wide text-gray-800"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Kresko - <span className="text-blue-500">Gestión Financiera Inteligente</span>
          </Typography>
          <Box className="flex flex-col gap-6">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/register")}
              fullWidth
              className="py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Registrarse
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/login")}
              fullWidth
              className="py-4 text-lg font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 border-2"
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Home;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Box, Typography } from "@mui/material";

const Loading: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000); // Simula un tiempo de carga de 3 segundos

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box className="flex flex-col justify-center items-center h-screen w-screen bg-gray-50">
      <CircularProgress color="primary" size={60} />
      <Typography variant="h6" className="mt-4">
        Cargando datos...
      </Typography>
    </Box>
  );
};

export default Loading;

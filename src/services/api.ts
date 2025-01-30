import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Reemplaza con la URL de tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token automáticamente a cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;

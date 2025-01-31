import api from "./api"; // Importa la configuración base de Axios

// **Registro de usuario**
export const register = async (
  username: string,
  email: string,
  password: string,
  phone: string
) => {
  return api.post("/auth/register", { username, email, password, phone });
};

// **Inicio de sesión**
export const login = async (email: string, password: string) => {
  return api.post("/auth/login", { email, password });
};

// **Confirmar código de verificación**
export const confirmCode = async (userId: string, code: string) => {
  return api.post("/auth/confirm-code", { userId, code });
};

// **Agregar un correo bancario vinculado**
export const addBankEmail = async (email: string, password: string) => {
  try {
    const response = await api.post("/bank-emails", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error al agregar correo bancario:", error);
    throw error;
  }
};

// **Listar todos los correos bancarios registrados**
export const listBankEmails = async () => {
  try {
    const response = await api.get("/bank-emails");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la lista de correos bancarios:", error);
    throw error;
  }
};

// **Procesar los datos bancarios asociados a los correos registrados**
export const processBankData = async () => {
  try {
    const response = await api.post("/bank-emails/process-data");
    return response.data;
  } catch (error) {
    console.error("Error al procesar los datos bancarios:", error);
    throw error;
  }
};

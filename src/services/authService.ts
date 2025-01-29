import api from "./api";

export const register = async (username: string, email: string, password: string, phone: string) => {
  return api.post("/auth/register", { username, email, password, phone });
};

export const confirmCode = async (userId: string, code: string) => {
  return api.post("/auth/confirm-code", { userId, code });
};

export const addBankEmail = async (email: string, password: string) => {
  return api.post("/auth/emails", { email, password });
};

export const listBankEmails = async () => {
  return api.get("/auth/emails");
};

export const processBankData = async () => {
  return api.post("/auth/process-data");
};

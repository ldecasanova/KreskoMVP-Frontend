import api from "./api";

export const register = async (email: string, password: string) => {
  return api.post("/auth/register", { email, password });
};

export const confirmCode = async (email: string, code: string) => {
  return api.post("/auth/confirm-code", { email, code });
};

export const addBankEmail = async (token: string, email: string, password: string) => {
  return api.post(
    "/auth/emails",
    { email, password },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const listBankEmails = async (token: string) => {
  return api.get("/auth/emails", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const processBankData = async (token: string) => {
  return api.post("/auth/process-data", {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

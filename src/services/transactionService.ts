import api from "./api";

export const getTransactions = async (token: string) => {
  return api.get("/transactions", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTransactionStats = async (token: string) => {
  return api.get("/transactions/stats", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const processTransactionData = async (token: string) => {
  return api.post("/transactions/process-data", {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

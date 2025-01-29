import api from "./api";

export const getTransactions = async () => {
  return api.get("/transactions");
};

export const getTransactionStats = async () => {
  return api.get("/transactions/stats");
};

export const processTransactionData = async () => {
  return api.post("/transactions/process-data");
};

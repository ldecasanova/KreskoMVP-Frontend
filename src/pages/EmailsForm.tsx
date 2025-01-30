import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper, IconButton, Alert } from "@mui/material";
import { AddCircleOutline, DeleteOutline } from "@mui/icons-material";
import { addBankEmail } from "../services/authService";

const EmailsForm: React.FC = () => {
  const [emails, setEmails] = useState([{ email: "", password: "" }]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (index: number, field: keyof typeof emails[0], value: string) => {
    const updatedEmails = [...emails];
    updatedEmails[index][field] = value;
    setEmails(updatedEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, { email: "", password: "" }]);
  };

  const handleRemoveEmail = (index: number) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    try {
      for (const email of emails) {
        if (!validateEmail(email.email)) {
          setError("Uno o más correos electrónicos no son válidos.");
          setLoading(false);
          return;
        }
        await addBankEmail(email.email, email.password);
      }
      alert("Correos bancarios registrados correctamente. Extrayendo datos...");
      navigate("/dashboard");
    } catch (err: any) {
      setError("Error al procesar los correos. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <Box className="flex justify-center items-center h-screen w-screen bg-gray-50 px-4">
      <Paper className="p-8 shadow-lg w-full max-w-md">
        <Typography variant="h5" align="center" className="mb-6 font-bold">
          Vincula tus correos bancarios
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {emails.map((email, index) => (
            <Box key={index} className="flex flex-col gap-2">
              <TextField
                label="Correo bancario"
                variant="outlined"
                value={email.email}
                onChange={(e) => handleChange(index, "email", e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Contraseña de aplicación"
                type="password"
                variant="outlined"
                value={email.password}
                onChange={(e) => handleChange(index, "password", e.target.value)}
                fullWidth
                required
              />
              {emails.length > 1 && (
                <IconButton onClick={() => handleRemoveEmail(index)} color="error">
                  <DeleteOutline />
                </IconButton>
              )}
            </Box>
          ))}
          <IconButton onClick={handleAddEmail} color="primary">
            <AddCircleOutline />
          </IconButton>
          <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
            {loading ? "Procesando..." : "Continuar"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EmailsForm;

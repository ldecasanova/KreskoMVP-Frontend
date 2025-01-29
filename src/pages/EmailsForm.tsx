import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper, IconButton } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { addBankEmail } from "../services/authService"; // Importar servicio

const EmailsForm: React.FC = () => {
  const [emails, setEmails] = useState([{ email: "", password: "" }]);
  const navigate = useNavigate();

  const handleAddEmail = () => {
    setEmails([...emails, { email: "", password: "" }]);
  };

  const handleChange = (index: number, field: keyof typeof emails[0], value: string) => {
    const updatedEmails = [...emails];
    updatedEmails[index][field] = value;
    setEmails(updatedEmails);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      for (const email of emails) {
        await addBankEmail(email.email, email.password);
      }
      alert("Correos agregados correctamente.");
      navigate("/loading");
    } catch (error) {
      alert("No se pudo agregar los correos bancarios.");
    }
  };

  return (
    <Box className="flex justify-center items-center h-screen w-screen bg-gray-50 px-4">
      <Paper className="p-8 shadow-lg w-full max-w-md">
        <Typography variant="h5" align="center" className="mb-6">
          Vincula tus correos bancarios
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {emails.map((email, index) => (
            <Box key={index} className="flex flex-col gap-2">
              <TextField
                label="Correo vinculado al banco"
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
            </Box>
          ))}
          <IconButton onClick={handleAddEmail} color="primary">
            <AddCircleOutline />
          </IconButton>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Continuar
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EmailsForm;

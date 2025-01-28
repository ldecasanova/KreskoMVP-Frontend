import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Correos ingresados:", emails);
    navigate("/loading");
  };

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Typography variant="h5" className="mb-6">
        Vincula tus correos bancarios
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        {emails.map((email, index) => (
          <Box key={index} className="flex flex-col gap-2">
            <TextField
              label="Correo vinculado al banco"
              variant="outlined"
              value={email.email}
              onChange={(e) =>
                handleChange(index, "email", e.target.value)
              }
              fullWidth
              required
            />
            <TextField
              label="Contraseña de aplicación"
              type="password"
              variant="outlined"
              value={email.password}
              onChange={(e) =>
                handleChange(index, "password", e.target.value)
              }
              fullWidth
              required
            />
          </Box>
        ))}
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddEmail}
          fullWidth
        >
          Agregar otro correo
        </Button>
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Continuar
        </Button>
      </form>
    </Box>
  );
};

export default EmailsForm;

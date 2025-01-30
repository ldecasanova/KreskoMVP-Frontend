import React, { useState } from "react";
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, MenuItem, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { saveAs } from "file-saver";
import { styled } from "@mui/material/styles";

const GradientBackground = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(to right, #7b64e7, #cf7ff6)",
  padding: "2rem",
  width: "100vw",
  overflowX: "hidden",
});

const CenteredContainer = styled(Box)({
  maxWidth: "1200px",
  width: "90%",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
  padding: "2rem",
  margin: "auto",
});

const initialData = [
  { timestamp: "12/1/2025 12:22:00", date: "12/01/2025", paymentMethod: "BCP", type: "TD", category: "PLIN-ANDREA VERA", currency: "PEN", amount: 30 },
  { timestamp: "14/1/2025 18:27:00", date: "14/01/2025", paymentMethod: "BCP", type: "TD", category: "T2200 SAN BORJA PLAZA F", currency: "PEN", amount: 13.9 },
  { timestamp: "13/1/2025 23:48:00", date: "13/01/2025", paymentMethod: "BCP", type: "TD", category: "DLCMICROSOFT", currency: "PEN", amount: 21.99 },
];

const GastosPage: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState("");
  const [filterCurrency, setFilterCurrency] = useState("");

  const handleDelete = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const handleExportToExcel = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      ["Marca Temporal,Fecha,Medio de Pago,Tipo,Categoría,Moneda,Importe"].concat(
        data.map(row => `${row.timestamp},${row.date},${row.paymentMethod},${row.type},${row.category},${row.currency},${row.amount}`)
      ).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "gastos.csv");
  };

  const filteredData = data.filter(row =>
    row.category.toLowerCase().includes(search.toLowerCase()) &&
    (filterPaymentMethod ? row.paymentMethod === filterPaymentMethod : true) &&
    (filterCurrency ? row.currency === filterCurrency : true)
  );

  return (
    <GradientBackground>
      <CenteredContainer>
        <Typography variant="h4" gutterBottom textAlign="center">Lista de Gastos</Typography>
        <TextField
          label="Buscar"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Box display="flex" justifyContent="center" gap={2}>
          <Select
            value={filterPaymentMethod}
            onChange={(e) => setFilterPaymentMethod(e.target.value)}
            displayEmpty
            sx={{ mt: 2 }}
          >
            <MenuItem value="">Todos los medios de pago</MenuItem>
            <MenuItem value="BCP">BCP</MenuItem>
            <MenuItem value="Yape">Yape</MenuItem>
          </Select>
          <Select
            value={filterCurrency}
            onChange={(e) => setFilterCurrency(e.target.value)}
            displayEmpty
            sx={{ mt: 2 }}
          >
            <MenuItem value="">Todas las monedas</MenuItem>
            <MenuItem value="PEN">PEN</MenuItem>
          </Select>
        </Box>
        <Button variant="contained" color="primary" onClick={handleExportToExcel} startIcon={<FileDownloadIcon />} sx={{ mt: 2 }}>Exportar a Excel</Button>
        <TableContainer component={Paper} sx={{ marginTop: 2, width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Marca Temporal</TableCell>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Medio de Pago</TableCell>
                <TableCell align="center">Tipo</TableCell>
                <TableCell align="center">Categoría</TableCell>
                <TableCell align="center">Moneda</TableCell>
                <TableCell align="center">Importe</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.timestamp}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.paymentMethod}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="center">{row.currency}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CenteredContainer>
    </GradientBackground>
  );
};

export default GastosPage;

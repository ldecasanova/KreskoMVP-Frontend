import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Card, CardContent, Typography, Box, Grid, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";

// Registrar componentes de Chart.js
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GradientBackground = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(to right, #7b64e7, #cf7ff6)",
  padding: "2rem",
});

const FloatingCard = styled(Card)({
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
  width: "100%",
});

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>({
    totalSpent: 2000,
    totalTransactions: 50,
    avgTransaction: 40,
    budget: 3000,
    groupedByCompany: { Apple: 600, Uber: 400, MercadoLibre: 1000 },
    groupedByBank: { BBVA: 900, Scotiabank: 1100 },
    cardUsage: { Crédito: 1200, Débito: 800 }, // Datos de tipo de tarjeta
  });

  const [selectedCategory, setSelectedCategory] = useState("PLIN-ANDREA VERA");
  const [selectedMonth, setSelectedMonth] = useState("January");

  const savings = stats.budget - stats.totalSpent;

  const barData = {
    labels: Object.keys(stats.groupedByCompany),
    datasets: [
      {
        label: "Gastos por Empresa",
        data: Object.values(stats.groupedByCompany),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const pieDataBank = {
    labels: Object.keys(stats.groupedByBank),
    datasets: [
      {
        data: Object.values(stats.groupedByBank),
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const pieDataCardUsage = {
    labels: Object.keys(stats.cardUsage),
    datasets: [
      {
        data: Object.values(stats.cardUsage),
        backgroundColor: ["#4CAF50", "#FFC107"],
      },
    ],
  };

  const topExpensesData = {
    labels: ["Jooalex J", "GRUPO TAVA SAC", "TGI FRIDAYS", "Edinson X", "JOINNUS", "Andrea A"],
    datasets: [
      {
        label: "Top 6 Gastos",
        data: [66.7, 58, 53, 50, 50, 40],
        backgroundColor: "#000",
      },
    ],
  };

  const monthlyExpenseData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: `Gasto mensual - ${selectedCategory}`,
        data: [37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#000",
      },
    ],
  };

  return (
    <GradientBackground>
      <Grid container spacing={4} padding={4}>
        {/* Tarjetas de estadísticas */}
        <Grid container item spacing={4} xs={12}>
          <Grid item xs={12} md={3}>
            <FloatingCard>
              <CardContent>
                <Typography variant="h6">Total Gastos</Typography>
                <Typography variant="h4" color="secondary">${stats.totalSpent}</Typography>
              </CardContent>
            </FloatingCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <FloatingCard>
              <CardContent>
                <Typography variant="h6">Número de Transacciones</Typography>
                <Typography variant="h4" color="secondary">{stats.totalTransactions}</Typography>
              </CardContent>
            </FloatingCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <FloatingCard>
              <CardContent>
                <Typography variant="h6">Promedio por Transacción</Typography>
                <Typography variant="h4" color="secondary">${stats.avgTransaction.toFixed(2)}</Typography>
              </CardContent>
            </FloatingCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <FloatingCard>
              <CardContent>
                <Typography variant="h6">Ahorro Mensual</Typography>
                <Typography variant="h4" color="secondary">${savings}</Typography>
              </CardContent>
            </FloatingCard>
          </Grid>
        </Grid>

        {/* Gráficos principales */}
        <Grid container item spacing={4} xs={12}>
          <Grid item xs={12} md={6}>
            <FloatingCard>
              <CardContent>
                <Typography variant="h6" align="center">Distribución de Gastos</Typography>
                <Bar data={barData} />
              </CardContent>
            </FloatingCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <FloatingCard>
              <CardContent>
                <Typography variant="h6">Gasto Mensual</Typography>
                <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} fullWidth sx={{ mb: 2 }}>
                  <MenuItem value="PLIN-ANDREA VERA">PLIN-ANDREA VERA</MenuItem>
                  <MenuItem value="DLCMICROSOFT">DLCMICROSOFT</MenuItem>
                </Select>
                <Bar data={monthlyExpenseData} />
              </CardContent>
            </FloatingCard>
          </Grid>
        </Grid>

        {/* Gráfico de los Top 6 Gastos */}
        <Grid container item spacing={4} xs={12}>
          <Grid item xs={12} md={6}>
            <FloatingCard>
              <CardContent>
                <Typography variant="h6">Top 6 gastos del mes seleccionado</Typography>
                <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} fullWidth sx={{ mb: 2 }}>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                    <MenuItem key={month} value={month}>{month}</MenuItem>
                  ))}
                </Select>
                <Bar data={topExpensesData} />
              </CardContent>
            </FloatingCard>
          </Grid>

          {/* Gráficos de Distribución por Banco y Tipo de Tarjeta */}
          <Grid item xs={12} md={3}>
            <FloatingCard>
              <CardContent>
                <Typography variant="h6" align="center">Distribución por Banco</Typography>
                <Box sx={{ width: "100%", height: "200px" }}>
                  <Pie data={pieDataBank} options={{ maintainAspectRatio: false }} />
                </Box>
              </CardContent>
            </FloatingCard>
          </Grid>

          <Grid item xs={12} md={3}>
            <FloatingCard>
              <CardContent>
                <Typography variant="h6" align="center">Uso de Tarjetas</Typography>
                <Box sx={{ width: "100%", height: "200px" }}>
                  <Pie data={pieDataCardUsage} options={{ maintainAspectRatio: false }} />
                </Box>
              </CardContent>
            </FloatingCard>
          </Grid>
        </Grid>
      </Grid>
    </GradientBackground>
  );
};

export default Dashboard;

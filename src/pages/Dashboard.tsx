import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getTransactionStats } from "../services/transactionService";
import { Card, CardContent, Typography, CircularProgress, Box, Grid } from "@mui/material";

// Registrar componentes de Chart.js
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getTransactionStats();
        setStats(response.data);
      } catch (err: any) {
        setError("Error al obtener estadísticas financieras.");
        console.error("Error al obtener estadísticas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" marginLeft={2}>
          Cargando datos financieros...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" padding={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!stats || Object.keys(stats).length === 0) {
    return (
      <Box textAlign="center" padding={4}>
        <Typography>No hay datos disponibles.</Typography>
      </Box>
    );
  }

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

  const pieData = {
    labels: Object.keys(stats.groupedByBank),
    datasets: [
      {
        data: Object.values(stats.groupedByBank),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <Grid container spacing={4} padding={4}>
      {/* Tarjeta de Total Gastos */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Gastos</Typography>
            <Typography variant="h4" color="secondary">
              ${stats.totalSpent}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Gráficos */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" align="center">
              Distribución de Gastos
            </Typography>
            <Bar data={barData} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" align="center">
              Distribución por Banco
            </Typography>
            <Pie data={pieData} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

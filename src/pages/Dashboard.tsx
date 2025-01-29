import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { getTransactionStats } from "../services/transactionService";
import { Card, CardContent, Typography } from "@mui/material";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getTransactionStats();
        setStats(response.data);
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Cargando datos...</p>;

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardContent>
          <Typography variant="h6">Total Gastos</Typography>
          <Typography variant="h4">${stats.totalSpent}</Typography>
        </CardContent>
      </Card>
      <div>
        <Bar data={barData} />
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default Dashboard;

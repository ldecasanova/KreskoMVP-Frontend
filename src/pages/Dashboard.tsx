import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <Card>
        <CardContent>
          <Typography variant="h6">Total Gastos</Typography>
          <Typography variant="h4">$1,200</Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Metas Alcanzadas</Typography>
          <Typography variant="h4">3/5</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

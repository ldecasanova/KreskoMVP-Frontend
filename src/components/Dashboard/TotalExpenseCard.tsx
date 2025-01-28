// components/Dashboard/TotalExpensesCard.tsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const TotalExpensesCard: React.FC<{ amount: number }> = ({ amount }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Total Gastos</Typography>
        <Typography variant="h4">${amount}</Typography>
      </CardContent>
    </Card>
  );
};

export default TotalExpensesCard;

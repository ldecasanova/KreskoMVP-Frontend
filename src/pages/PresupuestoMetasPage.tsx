import React, { useState } from "react";
import { Box, Typography, TextField, Button, Card, CardContent, Slider, IconButton, Fab, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
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
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  margin: "auto",
});

const GoalsContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  justifyContent: "center",
  padding: "1rem 0",
});

const Title = styled(Typography)({
  fontFamily: "'BrandMark 1', sans-serif",
  fontWeight: "bold",
  color: "white",
});

interface Goal {
  id: number;
  name: string;
  target: number;
  saved: number;
  percentage: number;
}

const PresupuestoMetas: React.FC = () => {
  const [budget, setBudget] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Enero");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({ name: "", target: "", percentage: "" });
  const [showGoalForm, setShowGoalForm] = useState(false);

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target && newGoal.percentage) {
      const goal: Goal = {
        id: goals.length + 1,
        name: newGoal.name,
        target: parseFloat(newGoal.target),
        saved: 0,
        percentage: parseFloat(newGoal.percentage),
      };
      setGoals([...goals, goal]);
      setNewGoal({ name: "", target: "", percentage: "" });
      setShowGoalForm(false);
    }
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <GradientBackground>
      <CenteredContainer>
        <Card sx={{ padding: 2, width: "100%" }}>
          <CardContent>
            <Typography variant="h6">Presupuesto Mensual</Typography>
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              fullWidth
              
            >
              {["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"].map((month) => (
                <MenuItem key={month} value={month}>{month}</MenuItem>
              ))}
            </Select>
            <TextField
              label="Presupuesto Mensual (PEN)"
              variant="outlined"
              fullWidth
              
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </CardContent>
        </Card>
        
        <Title variant="h5" gutterBottom textAlign="center">Metas de Ahorro</Title>
        <Box display="flex" justifyContent="center">
          <Fab color="primary" onClick={() => setShowGoalForm(true)}>
            <AddIcon />
          </Fab>
        </Box>

        {showGoalForm && (
          <Card sx={{ padding: 2, width: "100%" }}>
            <CardContent>
              <Typography variant="h6">Nueva Meta</Typography>
              <TextField
                label="Nombre de la Meta"
                variant="outlined"
                fullWidth
                
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              />
              <TextField
                label="Monto de la Meta (PEN)"
                variant="outlined"
                fullWidth
                
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
              />
              <TextField
                label="% de Ahorro Asignado"
                variant="outlined"
                fullWidth
                
                type="number"
                value={newGoal.percentage}
                onChange={(e) => setNewGoal({ ...newGoal, percentage: e.target.value })}
              />
              <Button variant="contained" onClick={handleAddGoal}>
                Guardar Meta
              </Button>
            </CardContent>
          </Card>
        )}

        <GoalsContainer>
          {goals.map(goal => (
            <Card key={goal.id} sx={{ minWidth: 250, padding: 2, position: "relative" }}>
              <IconButton
                sx={{ position: "absolute", top: 5, right: 5, backgroundColor: "red", color: "white" }}
                size="small"
                onClick={() => handleDeleteGoal(goal.id)}
              >
                <CloseIcon />
              </IconButton>
              <CardContent>
                <Typography variant="h6">{goal.name}</Typography>
                <Typography variant="body1">Meta: {goal.target} PEN</Typography>
                <Typography variant="body1">Ahorro Asignado: {goal.percentage}%</Typography>
                <Typography variant="body1">Progreso:</Typography>
                <Slider
                  value={(goal.saved / goal.target) * 100}
                  disabled
                  sx={{ mt: 2 }}
                />
                <Typography variant="body2">{goal.saved} / {goal.target} PEN</Typography>
              </CardContent>
            </Card>
          ))}
        </GoalsContainer>
      </CenteredContainer>
    </GradientBackground>
  );
};

export default PresupuestoMetas;

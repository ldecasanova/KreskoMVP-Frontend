import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SavingsIcon from "@mui/icons-material/Savings";

const StyledDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    backgroundColor: "#fff",
    borderRadius: "0 12px 12px 0",
    boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.1)",
    transition: "width 0.3s",
    overflow: "hidden",
    width: "60px",
    "&:hover": {
      width: "200px",
    },
  },
});

const Navbar: React.FC = () => {
  return (
    <StyledDrawer variant="permanent" open>
      <List>
        <ListItem component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to="/gastos">
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Gastos" />
        </ListItem>
        <ListItem component={Link} to="/presupuesto-metas">
          <ListItemIcon>
            <SavingsIcon />
          </ListItemIcon>
          <ListItemText primary="Presupuesto y Metas" />
        </ListItem>
      </List>
    </StyledDrawer>
  );
};

export default Navbar;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmailsForm from "./pages/EmailsForm";
import Loading from "./pages/Loading";
import Dashboard from "./pages/Dashboard";
import GastosPage from "./pages/GastosPage"; // ✅ Importa la página de Gastos
import PresupuestoMetasPage from "./pages/PresupuestoMetasPage"; // ✅ Importa la nueva página de Presupuesto y Metas
import Navbar from "./components/Common/Navbar"; // ✅ Importa la Navbar

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas sin Navbar (páginas de autenticación y carga) */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/emailsform" element={<EmailsForm />} />
        <Route path="/loading" element={<Loading />} />

        {/* Rutas con Navbar */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/gastos"
          element={
            <>
              <Navbar />
              <GastosPage />
            </>
          }
        />
        <Route
          path="/presupuesto-metas"
          element={
            <>
              <Navbar />
              <PresupuestoMetasPage />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra de navegación */}
      <header className="bg-blue-500 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Mi Dashboard de Gastos</h1>
      </header>

      {/* Contenido principal */}
      <main className="p-6">
        <AppRoutes />
      </main>

      {/* Pie de página */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Mi App de Gastos. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default App;

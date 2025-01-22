import React from 'react';
import GastosTable from '../components/GastosTable';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Dashboard de Gastos</h1>
      <GastosTable />
    </div>
  );
};

export default Dashboard;

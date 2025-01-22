import React, { useEffect, useState } from 'react';
import { fetchSheetData } from '../services/GoogleSheetsService';

const GastosTable: React.FC = () => {
  const [data, setData] = useState<string[][]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const sheetData = await fetchSheetData();
        setData(sheetData.slice(1)); // Ignorar la primera fila (encabezados)
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse w-full text-left">
        <thead>
          <tr>
            {['Nombre', 'Monto', 'Fecha', 'Empresa/Beneficiario', 'Tipo de Operación', 'Correo Destinatario'].map(
              (header, index) => (
                <th key={index} className="border p-2 bg-gray-100 text-gray-600 font-medium">
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border p-2 text-gray-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GastosTable;

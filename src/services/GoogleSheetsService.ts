import axios from 'axios';

const SHEET_ID = 'TU_SHEET_ID'; // Reemplaza con tu ID de Google Sheets
const API_KEY = 'TU_API_KEY'; // Reemplaza con tu clave de API
const SHEET_RANGE = 'Tabla_2'; // Reemplaza con el rango o nombre de la hoja

export const fetchSheetData = async () => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_RANGE}?key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data.values; // Devuelve las filas de la hoja
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    throw error;
  }
};

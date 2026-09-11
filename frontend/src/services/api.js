import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Calculate financial plan for a given margin capital
 * @param {number} marginCapital 
 */
export const calculateFinance = async (marginCapital) => {
  const response = await api.post('/finance/calculate', { marginCapital: Number(marginCapital) });
  return response.data;
};

/**
 * Generate AI Business Feasibility Report
 * @param {Object} payload 
 */
export const generateFeasibilityReport = async (payload) => {
  const response = await api.post('/feasibility/generate', payload);
  return response.data;
};

/**
 * Format currency in Indian Rupees format (e.g., ₹1,00,000)
 * @param {number} amount 
 */
export const formatINR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

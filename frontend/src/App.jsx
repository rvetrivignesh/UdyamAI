import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BusinessInput from './pages/BusinessInput';
import FinancialPlan from './pages/FinancialPlan';
import './i18n';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<BusinessInput />} />
        <Route path="/plan" element={<FinancialPlan />} />
      </Routes>
    </Router>
  );
}

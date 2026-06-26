import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota inicial é o Login */}
        <Route path="/" element={<Login />} />
        
        {/* Rota do sistema é o Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Se o usuário digitar um link que não existe, joga ele pro Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
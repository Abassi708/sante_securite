import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import TechnicienLogin from './components/TechnicienLogin';
import SocialLogin from './components/SocialLogin';
import AgentLogin from './components/AgentLogin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil - sélection du rôle */}
        <Route path="/" element={<RoleSelection />} />
        
        {/* Pages de login pour chaque rôle */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/technicien" element={<TechnicienLogin />} />
        <Route path="/social" element={<SocialLogin />} />
        <Route path="/agent" element={<AgentLogin />} />
        
        {/* Tableaux de bord (protégés) */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
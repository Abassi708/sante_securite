import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Clock, Calendar, TrendingUp, Download, ArrowLeft, 
  LogOut, Search, Filter, Eye, CheckCircle, XCircle, BarChart,
  Users, Briefcase, Award, Zap, Bell, Settings, HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/TechnicienDashboard.css';

const TechnicienDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats] = useState({
    rapports: 24,
    enAttente: 7,
    completes: 17,
    taches: 12,
    taux: 75
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bonjour');
    else if (hour < 18) setGreeting('Bon après-midi');
    else setGreeting('Bonsoir');
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!token || !userData) {
      navigate('/technicien');
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleHistorique = () => {
    navigate('/technicien/historique');
  };

  return (
    <div className="technicien-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <FileText size={28} color="#C4A962" />
          <div>
            <h1>Espace Technicien</h1>
            <p>{greeting}, {user?.email || 'Technicien'}</p>
          </div>
        </div>
        <div className="header-right">
          <div className="datetime">
            <Clock size={14} /> {currentTime.toLocaleTimeString('fr-FR')}
            <Calendar size={14} /> {currentTime.toLocaleDateString('fr-FR')}
          </div>
          <button className="btn-icon" onClick={handleHistorique}>
            <FileText size={18} />
          </button>
          <button className="btn-icon" onClick={handleLogout}>
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <FileText size={24} />
          <div>
            <span className="stat-label">Rapports</span>
            <span className="stat-value">{stats.rapports}</span>
          </div>
        </div>
        <div className="stat-card">
          <Clock size={24} />
          <div>
            <span className="stat-label">En attente</span>
            <span className="stat-value">{stats.enAttente}</span>
          </div>
        </div>
        <div className="stat-card">
          <CheckCircle size={24} />
          <div>
            <span className="stat-label">Complétés</span>
            <span className="stat-value">{stats.completes}</span>
          </div>
        </div>
        <div className="stat-card">
          <TrendingUp size={24} />
          <div>
            <span className="stat-label">Taux</span>
            <span className="stat-value">{stats.taux}%</span>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="dashboard-content">
        <h2>Bienvenue dans votre espace de travail</h2>
        <p>Gérez vos rapports et tâches administratives</p>
      </div>
    </div>
  );
};

export default TechnicienDashboard;
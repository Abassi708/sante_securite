import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Clock, Calendar, MapPin, Phone, Mail, LogOut,
  Briefcase, CheckCircle, AlertCircle, Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/AgentDashboard.css';

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

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
      navigate('/agent');
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="agent-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <User size={28} color="#C4A962" />
          <div>
            <h1>Espace Agent</h1>
            <p>{greeting}, {user?.email || 'Agent'}</p>
          </div>
        </div>
        <div className="header-right">
          <div className="datetime">
            <Clock size={14} /> {currentTime.toLocaleTimeString('fr-FR')}
            <Calendar size={14} /> {currentTime.toLocaleDateString('fr-FR')}
          </div>
          <button className="btn-icon" onClick={handleLogout}>
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <Briefcase size={24} />
          <div>
            <span className="stat-label">Missions</span>
            <span className="stat-value">12</span>
          </div>
        </div>
        <div className="stat-card">
          <CheckCircle size={24} />
          <div>
            <span className="stat-label">Complétées</span>
            <span className="stat-value">8</span>
          </div>
        </div>
        <div className="stat-card">
          <Clock size={24} />
          <div>
            <span className="stat-label">En cours</span>
            <span className="stat-value">4</span>
          </div>
        </div>
        <div className="stat-card">
          <MapPin size={24} />
          <div>
            <span className="stat-label">Sites</span>
            <span className="stat-value">3</span>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="dashboard-content">
        <h2>Bienvenue sur votre espace personnel</h2>
        <p>Consultez vos missions et votre planning</p>
      </div>
    </div>
  );
};

export default AgentDashboard;
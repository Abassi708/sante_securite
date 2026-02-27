import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Users, Clock, Calendar, TrendingUp, Download, ArrowLeft, 
  LogOut, Phone, Mail, MessageCircle, Award, Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/SocialDashboard.css';

const SocialDashboard = () => {
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
      navigate('/social');
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
    navigate('/social/historique');
  };

  return (
    <div className="social-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <Heart size={28} color="#C4A962" />
          <div>
            <h1>Service Social</h1>
            <p>{greeting}, {user?.email || 'Agent social'}</p>
          </div>
        </div>
        <div className="header-right">
          <div className="datetime">
            <Clock size={14} /> {currentTime.toLocaleTimeString('fr-FR')}
            <Calendar size={14} /> {currentTime.toLocaleDateString('fr-FR')}
          </div>
          <button className="btn-icon" onClick={handleHistorique}>
            <Heart size={18} />
          </button>
          <button className="btn-icon" onClick={handleLogout}>
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <Users size={24} />
          <div>
            <span className="stat-label">Bénéficiaires</span>
            <span className="stat-value">156</span>
          </div>
        </div>
        <div className="stat-card">
          <Phone size={24} />
          <div>
            <span className="stat-label">Consultations</span>
            <span className="stat-value">43</span>
          </div>
        </div>
        <div className="stat-card">
          <MessageCircle size={24} />
          <div>
            <span className="stat-label">Suivis</span>
            <span className="stat-value">28</span>
          </div>
        </div>
        <div className="stat-card">
          <Award size={24} />
          <div>
            <span className="stat-label">Satisfaction</span>
            <span className="stat-value">94%</span>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="dashboard-content">
        <h2>Espace d'accompagnement social</h2>
        <p>Gérez vos dossiers et suivis sociaux</p>
      </div>
    </div>
  );
};

export default SocialDashboard;
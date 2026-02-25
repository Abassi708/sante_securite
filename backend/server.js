const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // URL de votre frontend React
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend opérationnel' });
});

const PORT = process.env.PORT || 5000;

// Démarrer le serveur
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Backend démarré sur http://localhost:${PORT}`);
  });
});
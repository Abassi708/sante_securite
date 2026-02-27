const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Configuration CORS pour tous les ports de développement
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:3004',
  'http://localhost:3005'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend opérationnel',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

// Démarrer le serveur
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Backend démarré sur http://localhost:${PORT}`);
    console.log(`📝 Frontend autorisés: ${allowedOrigins.join(', ')}`);
  });
}).catch(error => {
  console.error('❌ Erreur de connexion à la base de données:', error);
});
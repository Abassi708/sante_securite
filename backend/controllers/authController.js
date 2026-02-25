// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Connexion admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('📝 Tentative de connexion:', email);
    
    const user = await User.verifyCredentials(email, password);
    
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    
    if (user.Role !== 'admin') {
      return res.status(403).json({ message: 'Accès non autorisé - Compte non administrateur' });
    }
    
    const token = generateToken(user.Id_utilisateur);
    
    res.json({
      success: true,
      token,
      user: user.toJSON()
    });
    
  } catch (error) {
    console.error('❌ Erreur login:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Créer le premier admin
const registerAdmin = async (req, res) => {
  try {
    const { email, password, matricule } = req.body;
    
    console.log('📝 Tentative de création admin:', { email, matricule });
    
    // Vérifier si un admin existe déjà avec cet email
    const existingUser = await User.findOne({
      where: {
        Login: email
      }
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }
    
    // Créer l'admin
    const user = await User.createAdmin(email, password, matricule || 1);
    
    res.status(201).json({ 
      success: true, 
      message: 'Admin créé avec succès',
      user: user.toJSON() 
    });
    
  } catch (error) {
    console.error('❌ Erreur création admin:', error);
    res.status(500).json({ message: 'Erreur création admin' });
  }
};

module.exports = { loginAdmin, registerAdmin };
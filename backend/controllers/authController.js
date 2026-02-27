// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Historique = require('../models/Historique');
const { Op } = require('sequelize');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// ========== FONCTION DE CONNEXION GÉNÉRIQUE ==========
const login = async (req, res, expectedRole = null) => {
  try {
    const { email, password } = req.body;
    
    console.log('📝 Tentative de connexion:', email);
    
    // Vérifier les identifiants
    const user = await User.verifyCredentials(email, password);
    
    if (!user) {
      // Enregistrer la tentative échouée
      await Historique.enregistrerConnexion(
        { temp: true, email: email }, 
        req, 
        false
      );
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    
    // Vérifier le rôle si nécessaire
    if (expectedRole && user.Role !== expectedRole) {
      return res.status(403).json({ 
        message: `Accès non autorisé - Cette page est réservée aux ${expectedRole}s` 
      });
    }
    
    const token = generateToken(user.Id_utilisateur);
    
    // Enregistrer la connexion réussie
    await Historique.enregistrerConnexion(
      { 
        id: user.Id_utilisateur, 
        email: user.Login, 
        role: user.Role 
      }, 
      req, 
      true
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user.Id_utilisateur,
        email: user.Login,
        role: user.Role,
        matricule: user.matricule_agent
      }
    });
    
  } catch (error) {
    console.error('❌ Erreur login:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ========== ROUTES SPÉCIFIQUES PAR RÔLE ==========

// Connexion Admin
const loginAdmin = async (req, res) => {
  return login(req, res, 'admin');
};

// Connexion Technicien
const loginTechnicien = async (req, res) => {
  return login(req, res, 'technicien');
};

// Connexion Service Social
const loginSocial = async (req, res) => {
  return login(req, res, 'social');
};

// Connexion Agent
const loginAgent = async (req, res) => {
  return login(req, res, 'agent');
};

// ========== CRÉATION D'UTILISATEUR (pour admin) ==========
const registerUser = async (req, res) => {
  try {
    const { email, password, role, matricule, nom, prenom, phone, department, position, location } = req.body;
    
    console.log('📝 Tentative de création utilisateur:', { email, role });
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({
      where: {
        Login: email
      }
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }
    
    // Créer l'utilisateur
    const user = await User.createAdmin(
      email, 
      password, 
      role || 'agent', 
      matricule || 1
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Utilisateur créé avec succès',
      user: user.toJSON() 
    });
    
  } catch (error) {
    console.error('❌ Erreur création utilisateur:', error);
    res.status(500).json({ message: 'Erreur création utilisateur' });
  }
};

// ========== RÉCUPÉRER TOUS LES UTILISATEURS ==========
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    
    res.json({
      success: true,
      users: users.map(u => u.toJSON())
    });
    
  } catch (error) {
    console.error('❌ Erreur récupération utilisateurs:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ========== RÉCUPÉRER UN UTILISATEUR PAR ID ==========
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json({
      success: true,
      user: user.toJSON()
    });
    
  } catch (error) {
    console.error('❌ Erreur récupération utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ========== MODIFIER UN UTILISATEUR ==========
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role, matricule, nom, prenom, phone, department, position, location, status } = req.body;
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Mettre à jour les champs
    if (email) user.Login = email;
    if (role) user.Role = role;
    if (matricule) user.matricule_agent = matricule;
    
    await user.save();
    
    res.json({
      success: true,
      message: 'Utilisateur modifié avec succès',
      user: user.toJSON()
    });
    
  } catch (error) {
    console.error('❌ Erreur modification utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ========== SUPPRIMER UN UTILISATEUR ==========
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    await user.destroy();
    
    res.json({
      success: true,
      message: 'Utilisateur supprimé avec succès'
    });
    
  } catch (error) {
    console.error('❌ Erreur suppression utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ========== RÉINITIALISER MOT DE PASSE ==========
const resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Hasher le nouveau mot de passe
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS));
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Mettre à jour le mot de passe
    user.Mot_de_passe = hashedPassword;
    await user.save();
    
    res.json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès'
    });
    
  } catch (error) {
    console.error('❌ Erreur réinitialisation mot de passe:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ========== RÉCUPÉRER L'HISTORIQUE DES CONNEXIONS ==========
const getHistorique = async (req, res) => {
  try {
    // Vérifier que l'utilisateur a le droit (admin, technicien, social)
    if (req.user.role !== 'admin' && 
        req.user.role !== 'technicien' && 
        req.user.role !== 'social') {
      return res.status(403).json({ 
        message: 'Accès non autorisé - Vous n\'avez pas les droits pour voir l\'historique' 
      });
    }
    
    const { page = 1, limit = 20, search = '', role = 'all', status = 'all' } = req.query;
    const offset = (page - 1) * limit;
    
    console.log(`📊 Récupération historique - Page: ${page}, Limit: ${limit}, Search: ${search}`);
    
    // Construire la clause WHERE
    let whereClause = {};
    
    if (search) {
      whereClause = {
        [Op.or]: [
          { user_email: { [Op.like]: `%${search}%` } },
          { ip_address: { [Op.like]: `%${search}%` } },
          { user_agent: { [Op.like]: `%${search}%` } }
        ]
      };
    }
    
    if (role !== 'all') {
      whereClause.user_role = role;
    }
    
    if (status !== 'all') {
      whereClause.success = status === 'success' ? 1 : 0;
    }
    
    // Compter le total
    const total = await Historique.count({ where: whereClause });
    
    // Récupérer les données
    const historique = await Historique.findAll({
      where: whereClause,
      order: [['timestamp', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    console.log(`✅ ${historique.length} connexions trouvées sur ${total} total`);
    
    res.json({
      success: true,
      data: historique,
      total: total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
    
  } catch (error) {
    console.error('❌ Erreur récupération historique:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ========== STATISTIQUES DE L'HISTORIQUE ==========
const getHistoriqueStats = async (req, res) => {
  try {
    // Compter les connexions aujourd'hui
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayCount = await Historique.count({
      where: {
        timestamp: {
          [Op.gte]: today,
          [Op.lt]: tomorrow
        }
      }
    });
    
    // Connexions cette semaine
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weekCount = await Historique.count({
      where: {
        timestamp: {
          [Op.gte]: weekAgo
        }
      }
    });
    
    // Connexions par rôle
    const adminCount = await Historique.count({ where: { user_role: 'admin' } });
    const technicienCount = await Historique.count({ where: { user_role: 'technicien' } });
    const socialCount = await Historique.count({ where: { user_role: 'social' } });
    const agentCount = await Historique.count({ where: { user_role: 'agent' } });
    const inconnuCount = await Historique.count({ where: { user_role: 'inconnu' } });
    
    // Succès vs échecs
    const successCount = await Historique.count({ where: { success: 1 } });
    const failedCount = await Historique.count({ where: { success: 0 } });
    
    res.json({
      success: true,
      stats: {
        today: todayCount,
        week: weekCount,
        total: await Historique.count(),
        byRole: {
          admin: adminCount,
          technicien: technicienCount,
          social: socialCount,
          agent: agentCount,
          inconnu: inconnuCount
        },
        byStatus: {
          success: successCount,
          failed: failedCount
        }
      }
    });
    
  } catch (error) {
    console.error('❌ Erreur stats historique:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ========== PROFIL DE L'UTILISATEUR CONNECTÉ ==========
const getMe = async (req, res) => {
  try {
    // req.user est déjà défini par le middleware protect
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json({
      success: true,
      user: user.toJSON()
    });
    
  } catch (error) {
    console.error('❌ Erreur getMe:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ========== DÉCONNEXION ==========
const logout = (req, res) => {
  res.json({
    success: true,
    message: 'Déconnexion réussie'
  });
};

module.exports = {
  // Authentification
  loginAdmin,
  loginTechnicien,
  loginSocial,
  loginAgent,
  logout,
  getMe,
  
  // Gestion des utilisateurs
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  resetPassword,
  
  // Historique
  getHistorique,
  getHistoriqueStats
};
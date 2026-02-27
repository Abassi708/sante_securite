const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  Id_utilisateur: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_utilisateur'
  },
  Login: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'Login'
  },
  Mot_de_passe: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'Mot_de_passe'
  },
  Role: {
    type: DataTypes.ENUM('rs', 'technicien', 'admin', 'agent'),
    allowNull: true,
    field: 'Role'
  },
  matricule_agent: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'matricule_agent'
  }
}, {
  tableName: 'utilisateur',
  timestamps: false
});

// Créer un utilisateur
User.createUser = async (email, password, role = 'agent', matricule = 1) => {
  try {
    console.log('📝 Création utilisateur:', { email, role, matricule });
    
    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Créer l'utilisateur
    const user = await User.create({
      Login: email,
      Mot_de_passe: hashedPassword,
      Role: role,
      matricule_agent: parseInt(matricule)
    });
    
    console.log('✅ Utilisateur créé avec ID:', user.Id_utilisateur);
    return user;
    
  } catch (error) {
    console.error('❌ Erreur création utilisateur:', error);
    throw error;
  }
};

// Alias pour créer un admin (pour la compatibilité)
User.createAdmin = User.createUser;

// Vérifier les identifiants
User.verifyCredentials = async (email, password) => {
  try {
    // Chercher l'utilisateur par email
    const user = await User.findOne({
      where: {
        Login: email
      }
    });
    
    if (!user) {
      console.log('❌ Utilisateur non trouvé:', email);
      return null;
    }
    
    // Vérifier le mot de passe
    const isValid = await bcrypt.compare(password, user.Mot_de_passe);
    
    if (!isValid) {
      console.log('❌ Mot de passe incorrect');
      return null;
    }
    
    console.log('✅ Authentification réussie pour:', email);
    return user;
    
  } catch (error) {
    console.error('❌ Erreur vérification:', error);
    throw error;
  }
};

// Version JSON sans données sensibles
User.prototype.toJSON = function() {
  return {
    id: this.Id_utilisateur,
    email: this.Login,
    role: this.Role,
    matricule: this.matricule_agent
  };
};

module.exports = User;
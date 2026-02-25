import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users,
  Shield,
  UserPlus,
  Search,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Key,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  LogOut,
  Bell,
  BarChart3,
  Settings,
  Grid,
  List,
  Moon,
  Sun,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Save,
  Map,
  Briefcase,
  Zap,
  Award,
  ChevronUp,
  ChevronDown,
  Download,
  Upload,
  AlertCircle,
  Info,
  Wrench,
  User,
  Smartphone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // États
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [showNotifications, setShowNotifications] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Données simulées
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        nom: 'Ben Ali',
        prenom: 'Mohamed',
        email: 'mohamed.benali@hse.tn',
        phone: '+216 98 765 432',
        role: 'admin',
        status: 'active',
        lastLogin: '2026-02-24T08:30:00',
        loginCount: 156,
        department: 'IT',
        position: 'Lead Developer',
        location: 'Tunis'
      },
      {
        id: 2,
        nom: 'Trabelsi',
        prenom: 'Sarra',
        email: 'sarra.trabelsi@hse.tn',
        phone: '+216 97 654 321',
        role: 'hse',
        status: 'active',
        lastLogin: '2026-02-24T09:15:00',
        loginCount: 89,
        department: 'HSE',
        position: 'Safety Manager',
        location: 'Sousse'
      },
      {
        id: 3,
        nom: 'Jaziri',
        prenom: 'Ahmed',
        email: 'ahmed.jaziri@hse.tn',
        phone: '+216 96 543 210',
        role: 'technicien',
        status: 'inactive',
        lastLogin: '2026-02-15T11:45:00',
        loginCount: 34,
        department: 'Maintenance',
        position: 'Technician',
        location: 'Bizerte'
      },
      {
        id: 4,
        nom: 'Mansour',
        prenom: 'Leila',
        email: 'leila.mansour@hse.tn',
        phone: '+216 95 432 109',
        role: 'agent',
        status: 'active',
        lastLogin: '2026-02-23T16:20:00',
        loginCount: 67,
        department: 'Field',
        position: 'Field Agent',
        location: 'Nabeul'
      }
    ];
    
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  // Filtrage
  useEffect(() => {
    let filtered = [...users];
    
    if (searchTerm) {
      filtered = filtered.filter(user => 
        `${user.nom} ${user.prenom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      );
    }
    
    if (selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === selectedRole);
    }
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(user => user.status === selectedStatus);
    }
    
    // Tri
    filtered.sort((a, b) => {
      let aVal, bVal;
      switch(sortBy) {
        case 'name':
          aVal = `${a.nom} ${a.prenom}`;
          bVal = `${b.nom} ${b.prenom}`;
          break;
        case 'email':
          aVal = a.email;
          bVal = b.email;
          break;
        default:
          aVal = `${a.nom} ${a.prenom}`;
          bVal = `${b.nom} ${b.prenom}`;
      }
      
      return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
    
    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedRole, selectedStatus, sortBy, sortOrder]);

  // Horloge
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: '3 nouveaux utilisateurs', time: '5 min', read: false },
    { id: 2, message: 'Demande de réinitialisation', time: '1 heure', read: false },
    { id: 3, message: 'Mise à jour disponible', time: '2 heures', read: true }
  ]);

  // Gestion des utilisateurs
  const handleAddUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      loginCount: 0,
      lastLogin: null
    };
    setUsers([...users, newUser]);
    setShowAddUserModal(false);
  };

  const handleEditUser = (userData) => {
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id ? { ...user, ...userData } : user
    );
    setUsers(updatedUsers);
    setShowEditUserModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleToggleStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleResetPassword = (userId) => {
    const user = users.find(u => u.id === userId);
    setSelectedUser(user);
    setShowResetPasswordModal(true);
  };

  const confirmResetPassword = () => {
    alert(`Email envoyé à ${selectedUser.email}`);
    setShowResetPasswordModal(false);
    setSelectedUser(null);
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length ? [] : filteredUsers.map(u => u.id)
    );
  };

  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetailsModal(true);
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Composants
  const UserCard = ({ user }) => {
    const roleColors = {
      admin: '#EF4444',
      hse: '#10B981',
      technicien: '#F59E0B',
      agent: '#3B82F6'
    };
    const color = roleColors[user.role];

    return (
      <motion.div 
        className="user-card"
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onClick={() => handleViewUserDetails(user)}
      >
        <div className="user-card-header">
          <div className="user-avatar" style={{ backgroundColor: `${color}15` }}>
            <span style={{ color }}>{user.prenom[0]}{user.nom[0]}</span>
          </div>
          <div className="user-status">
            <div className={`status-dot ${user.status}`} />
          </div>
        </div>
        
        <h3>{user.prenom} {user.nom}</h3>
        <div className="user-role" style={{ color }}>{user.role}</div>
        
        <div className="user-details">
          <div><Mail size={14} /> {user.email}</div>
          <div><Phone size={14} /> {user.phone}</div>
          <div><Map size={14} /> {user.location}</div>
        </div>

        <div className="user-footer">
          <div className="user-actions">
            <button onClick={(e) => { e.stopPropagation(); handleToggleStatus(user.id); }}>
              {user.status === 'active' ? <ToggleRight size={18} color="#10B981" /> : <ToggleLeft size={18} color="#94A3B8" />}
            </button>
            <button onClick={(e) => { e.stopPropagation(); setSelectedUser(user); setShowEditUserModal(true); }}>
              <Edit size={18} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleResetPassword(user.id); }}>
              <Key size={18} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.id); }}>
              <Trash2 size={18} />
            </button>
          </div>
          <div className="user-login">
            <Clock size={12} />
            <span>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fr-FR') : 'Jamais'}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  const UserRow = ({ user }) => {
    const roleColors = {
      admin: '#EF4444',
      hse: '#10B981',
      technicien: '#F59E0B',
      agent: '#3B82F6'
    };
    const color = roleColors[user.role];

    return (
      <tr 
        className={`user-row ${selectedUsers.includes(user.id) ? 'selected' : ''}`}
        onClick={() => handleViewUserDetails(user)}
      >
        <td onClick={(e) => e.stopPropagation()}>
          <input 
            type="checkbox" 
            checked={selectedUsers.includes(user.id)}
            onChange={() => handleSelectUser(user.id)}
          />
        </td>
        <td>
          <div className="user-cell">
            <div className="user-avatar" style={{ backgroundColor: `${color}15` }}>
              <span style={{ color }}>{user.prenom[0]}{user.nom[0]}</span>
            </div>
            <div>
              <div className="user-name">{user.prenom} {user.nom}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
        </td>
        <td>
          <span className="role-badge" style={{ backgroundColor: `${color}15`, color }}>
            {user.role}
          </span>
        </td>
        <td>
          <div className="status-badge">
            <div className={`status-dot ${user.status}`} />
            <span>{user.status === 'active' ? 'Actif' : 'Inactif'}</span>
          </div>
        </td>
        <td>{user.location}</td>
        <td>
          <div className="last-login">
            <Clock size={12} />
            <span>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fr-FR') : 'Jamais'}</span>
          </div>
        </td>
        <td>
          <div className="login-count">
            <Zap size={12} color={color} />
            <span>{user.loginCount}</span>
          </div>
        </td>
        <td>
          <div className="row-actions" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => handleToggleStatus(user.id)}>
              {user.status === 'active' ? <ToggleRight size={16} color="#10B981" /> : <ToggleLeft size={16} color="#94A3B8" />}
            </button>
            <button onClick={() => { setSelectedUser(user); setShowEditUserModal(true); }}>
              <Edit size={16} />
            </button>
            <button onClick={() => handleResetPassword(user.id)}>
              <Key size={16} />
            </button>
            <button onClick={() => handleDeleteUser(user.id)}>
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  // Modals
  const UserFormModal = ({ isOpen, onClose, onSave, user, title }) => {
    const [formData, setFormData] = useState({
      nom: user?.nom || '',
      prenom: user?.prenom || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || 'agent',
      status: user?.status || 'active',
      location: user?.location || ''
    });

    if (!isOpen) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{title}</h2>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
            <div className="modal-body">
              <div className="form-group">
                <label>Prénom</label>
                <input value={formData.prenom} onChange={e => setFormData({...formData, prenom: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Nom</label>
                <input value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Rôle</label>
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="admin">Admin</option>
                  <option value="hse">HSE</option>
                  <option value="technicien">Technicien</option>
                  <option value="agent">Agent</option>
                </select>
              </div>
              <div className="form-group">
                <label>Localisation</label>
                <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
              <button type="submit" className="btn-save">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ResetPasswordModal = ({ isOpen, onClose, onConfirm, user }) => {
    if (!isOpen) return null;
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content small" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Réinitialiser mot de passe</h2>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          <div className="modal-body">
            <p>Email envoyé à : <strong>{user?.email}</strong></p>
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={onClose}>Annuler</button>
            <button className="btn-reset" onClick={onConfirm}>Confirmer</button>
          </div>
        </div>
      </div>
    );
  };

  const UserDetailsModal = ({ isOpen, onClose, user }) => {
    if (!isOpen || !user) return null;
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Détails utilisateur</h2>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          <div className="modal-body">
            <div className="details-grid">
              <div><strong>Nom :</strong> {user.prenom} {user.nom}</div>
              <div><strong>Email :</strong> {user.email}</div>
              <div><strong>Téléphone :</strong> {user.phone}</div>
              <div><strong>Rôle :</strong> {user.role}</div>
              <div><strong>Statut :</strong> {user.status}</div>
              <div><strong>Localisation :</strong> {user.location}</div>
              <div><strong>Département :</strong> {user.department}</div>
              <div><strong>Poste :</strong> {user.position}</div>
              <div><strong>Connexions :</strong> {user.loginCount}</div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={onClose}>Fermer</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`dashboard-container theme-${theme}`}>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <Shield size={28} color="#C4A962" />
            {!sidebarCollapsed && <span>HSE Manager</span>}
          </div>
          <button className="collapse-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <div className="sidebar-menu">
          <div className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <BarChart3 size={18} />
            {!sidebarCollapsed && <span>Dashboard</span>}
          </div>
          <div className={`menu-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            <Users size={18} />
            {!sidebarCollapsed && <span>Utilisateurs</span>}
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            {!sidebarCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="content-header">
          <div>
            <h1>{activeTab === 'dashboard' ? 'Dashboard' : 'Utilisateurs'}</h1>
            <div className="header-date">
              <Calendar size={14} />
              <span>{currentTime.toLocaleDateString('fr-FR')}</span>
              <Clock size={14} />
              <span>{currentTime.toLocaleTimeString('fr-FR')}</span>
            </div>
          </div>

          <div className="header-actions">
            <div className="notifications">
              <button className="notif-btn" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell size={18} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="notif-badge">{notifications.filter(n => !n.read).length}</span>
                )}
              </button>

              {showNotifications && (
                <div className="notifications-dropdown">
                  {notifications.map(n => (
                    <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
                      <p>{n.message}</p>
                      <small>{n.time}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="help-btn">
              <HelpCircle size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="content-body">
          {activeTab === 'dashboard' && (
            <div className="dashboard-view">
              {/* DASHBOARD VIDE - juste un message élégant */}
              <div className="empty-state">
                <div className="empty-icon">
                  <BarChart3 size={64} color="#C4A962" />
                </div>
                <h2>Tableau de bord en cours de construction</h2>
                <p>Les statistiques et graphiques arriveront bientôt</p>
                <div className="empty-decoration">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-view">
              {/* Toolbar */}
              <div className="users-toolbar">
                <div className="search-box">
                  <Search size={16} />
                  <input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="filters">
                  <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                    <option value="all">Tous rôles</option>
                    <option value="admin">Admin</option>
                    <option value="hse">HSE</option>
                    <option value="technicien">Technicien</option>
                    <option value="agent">Agent</option>
                  </select>

                  <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                    <option value="all">Tous statuts</option>
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>

                  <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    {sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  <div className="view-toggle">
                    <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                      <Grid size={16} />
                    </button>
                    <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                      <List size={16} />
                    </button>
                  </div>

                  <button className="add-btn" onClick={() => setShowAddUserModal(true)}>
                    <UserPlus size={16} />
                    <span>Ajouter</span>
                  </button>
                </div>
              </div>

              {/* Users Grid/Table */}
              {viewMode === 'grid' ? (
                <div className="users-grid">
                  {filteredUsers.map(user => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              ) : (
                <div className="users-table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th><input type="checkbox" checked={selectedUsers.length === filteredUsers.length} onChange={handleSelectAll} /></th>
                        <th>Utilisateur</th>
                        <th>Rôle</th>
                        <th>Statut</th>
                        <th>Localisation</th>
                        <th>Dernière connexion</th>
                        <th>Connexions</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(user => (
                        <UserRow key={user.id} user={user} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAddUserModal && (
          <UserFormModal
            isOpen={showAddUserModal}
            onClose={() => setShowAddUserModal(false)}
            onSave={handleAddUser}
            title="Ajouter un utilisateur"
          />
        )}
        {showEditUserModal && (
          <UserFormModal
            isOpen={showEditUserModal}
            onClose={() => { setShowEditUserModal(false); setSelectedUser(null); }}
            onSave={handleEditUser}
            user={selectedUser}
            title="Modifier l'utilisateur"
          />
        )}
        {showResetPasswordModal && (
          <ResetPasswordModal
            isOpen={showResetPasswordModal}
            onClose={() => { setShowResetPasswordModal(false); setSelectedUser(null); }}
            onConfirm={confirmResetPassword}
            user={selectedUser}
          />
        )}
        {showUserDetailsModal && (
          <UserDetailsModal
            isOpen={showUserDetailsModal}
            onClose={() => setShowUserDetailsModal(false)}
            user={selectedUser}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
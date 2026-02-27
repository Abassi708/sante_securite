import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

// ===== ÉLÉGANTES ICONS SVG =====
const Icons = {
  Dashboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 10L12 3L21 10V20H3V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 20V14H15V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M15 12C17.2091 12 19 10.2091 19 8C19 5.79086 17.2091 4 15 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 20V19C3 15.6863 5.68629 13 9 13C12.3137 13 15 15.6863 15 19V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 20V19C17 15.6863 19.6863 13 23 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  History: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M19.4 15C19.2269 15.4697 19.0336 15.9055 18.8 16.32L20.4 18.71L18.71 20.4L16.32 18.8C15.9055 19.0336 15.4697 19.2269 15 19.4L14 22H10L9 19.4C8.5303 19.2269 8.09448 19.0336 7.68 18.8L5.29 20.4L3.6 18.71L5.2 16.32C4.96641 15.9055 4.77314 15.4697 4.6 15L2 14V10L4.6 9C4.77314 8.5303 4.96641 8.09448 5.2 7.68L3.6 5.29L5.29 3.6L7.68 5.2C8.09448 4.96641 8.5303 4.77314 9 4.6L10 2H14L15 4.6C15.4697 4.77314 15.9055 4.96641 16.32 5.2L18.71 3.6L20.4 5.29L18.8 7.68C19.0336 8.09448 19.2269 8.5303 19.4 9L22 10V14L19.4 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M21 21L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Bell: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 17V18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21C12.7956 21 13.5587 20.6839 14.1213 20.1213C14.6839 19.5587 15 18.7956 15 18V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Filter: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="22 3 2 3 10 13 10 21 14 18 14 13 22 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Edit: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 3L21 7L7 21H3V17L17 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Delete: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6H5H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6H19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Logout: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  X: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Activity: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Mail: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M22 7L12 13L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Phone: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16.92V19C22.001 19.9483 21.7056 20.8726 21.1581 21.6423C20.6106 22.4119 19.8434 22.9838 18.9652 23.2696C18.087 23.5555 17.1442 23.5386 16.2756 23.2212C15.407 22.9039 14.6612 22.305 14.14 21.517C10.6782 16.7797 8.07381 13.0552 5.79 9.13998C5.01374 7.87771 4.72773 6.37343 4.99091 4.91522C5.25409 3.45701 6.04528 2.14528 7.21 1.20998C7.75957 0.770274 8.40644 0.457048 9.09967 0.295076C9.7929 0.133105 10.513 0.126706 11.2088 0.276346C11.9047 0.425987 12.5568 0.727552 13.1142 1.15737C13.6716 1.58719 14.1173 2.13276 14.41 2.75998L16.41 6.67998C16.9375 7.69635 17.0791 8.86315 16.809 9.98119C16.539 11.0992 15.8792 12.0842 14.95 12.76L14.14 13.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 6V12C3 16.4183 7.58172 20 12 20C16.4183 20 21 16.4183 21 12V6L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Globe: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Lock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // ===== STATE =====
  const [activeView, setActiveView] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Nouvel utilisateur inscrit', time: '5 min', read: false },
    { id: 2, text: 'Mise à jour système', time: '2h', read: false },
    { id: 3, text: 'Rapport hebdomadaire', time: '1j', read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    admins: 0,
    hse: 0
  });

  // ===== INITIALISATION =====
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: 'Mohamed Ben Ali',
        email: 'mohamed.benali@hse.tn',
        phone: '+216 98 765 432',
        role: 'admin',
        status: 'active',
        lastActive: '2026-02-25T08:30:00',
        department: 'Direction',
        location: 'Tunis',
        twoFactor: true,
        lastLogin: '2026-02-25 08:30',
        joinDate: '2025-01-15'
      },
      {
        id: 2,
        name: 'Sarra Trabelsi',
        email: 'sarra.trabelsi@hse.tn',
        phone: '+216 97 654 321',
        role: 'hse',
        status: 'active',
        lastActive: '2026-02-25T09:15:00',
        department: 'HSE',
        location: 'Sousse',
        twoFactor: true,
        lastLogin: '2026-02-25 09:15',
        joinDate: '2025-03-20'
      },
      {
        id: 3,
        name: 'Ahmed Jaziri',
        email: 'ahmed.jaziri@hse.tn',
        phone: '+216 96 543 210',
        role: 'technicien',
        status: 'inactive',
        lastActive: '2026-02-15T11:45:00',
        department: 'Maintenance',
        location: 'Bizerte',
        twoFactor: false,
        lastLogin: '2026-02-15 11:45',
        joinDate: '2025-06-10'
      },
      {
        id: 4,
        name: 'Leila Mansour',
        email: 'leila.mansour@hse.tn',
        phone: '+216 95 432 109',
        role: 'agent',
        status: 'active',
        lastActive: '2026-02-24T16:20:00',
        department: 'Terrain',
        location: 'Nabeul',
        twoFactor: true,
        lastLogin: '2026-02-24 16:20',
        joinDate: '2025-09-05'
      },
      {
        id: 5,
        name: 'Youssef Karray',
        email: 'youssef.karray@hse.tn',
        phone: '+216 94 321 098',
        role: 'admin',
        status: 'active',
        lastActive: '2026-02-25T10:00:00',
        department: 'IT',
        location: 'Tunis',
        twoFactor: true,
        lastLogin: '2026-02-25 10:00',
        joinDate: '2024-11-20'
      }
    ];
    
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
    
    setStats({
      total: mockUsers.length,
      active: mockUsers.filter(u => u.status === 'active').length,
      admins: mockUsers.filter(u => u.role === 'admin').length,
      hse: mockUsers.filter(u => u.role === 'hse').length
    });
  }, []);

  // ===== HORLOGE =====
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ===== FILTRAGE =====
  useEffect(() => {
    let filtered = [...users];
    
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }
    
    setFilteredUsers(filtered);
  }, [users, searchQuery, roleFilter, statusFilter]);

  // ===== HANDLERS =====
  const handleAddUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      lastActive: new Date().toISOString(),
      lastLogin: new Date().toLocaleString(),
      joinDate: new Date().toISOString().split('T')[0],
      twoFactor: false
    };
    setUsers([...users, newUser]);
    setShowModal(false);
  };

  const handleEditUser = (userData) => {
    const updatedUsers = users.map(user => 
      user.id === editingUser.id ? { ...user, ...userData } : user
    );
    setUsers(updatedUsers);
    setEditingUser(null);
    setShowModal(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setSelectedUsers(selectedUsers.filter(uid => uid !== id));
    setDeleteConfirm(null);
  };

  const handleToggleStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length ? [] : filteredUsers.map(u => u.id)
    );
  };

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) return;
    setUsers(users.filter(user => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
  };

  const handleBulkActivate = () => {
    setUsers(users.map(user => 
      selectedUsers.includes(user.id) ? { ...user, status: 'active' } : user
    ));
    setSelectedUsers([]);
  };

  const handleBulkDeactivate = () => {
    setUsers(users.map(user => 
      selectedUsers.includes(user.id) ? { ...user, status: 'inactive' } : user
    ));
    setSelectedUsers([]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // ===== COMPOSANT STATS =====
  const StatCard = ({ icon: Icon, title, value, trend }) => (
    <div className="stat-card">
      <div className="stat-icon">{Icon()}</div>
      <div className="stat-content">
        <span className="stat-title">{title}</span>
        <span className="stat-value">{value}</span>
        {trend && <span className="stat-trend">{trend}</span>}
      </div>
    </div>
  );

  // ===== MODAL UTILISATEUR =====
  const UserModal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || 'agent',
      status: user?.status || 'active',
      department: user?.department || '',
      location: user?.location || ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{user ? 'Modifier' : 'Nouvel'} utilisateur</h2>
            <button className="modal-close" onClick={onClose}>
              <Icons.X />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Jean Dupont"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="jean@hse.tn"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Téléphone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="+216 99 999 999"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Rôle</label>
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                    <option value="admin">Administrateur</option>
                    <option value="hse">Responsable HSE</option>
                    <option value="technicien">Technicien</option>
                    <option value="agent">Agent</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Statut</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Département</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={e => setFormData({...formData, department: e.target.value})}
                    placeholder="Direction, HSE, IT..."
                  />
                </div>
                <div className="form-group">
                  <label>Localisation</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    placeholder="Tunis, Sousse..."
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={onClose}>Annuler</button>
              <button type="submit" className="btn-primary">{user ? 'Modifier' : 'Créer'}</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // ===== MODAL SUPPRESSION =====
  const DeleteModal = ({ user, onConfirm, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-sm" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Confirmation</h2>
          <button className="modal-close" onClick={onClose}>
            <Icons.X />
          </button>
        </div>
        <div className="modal-body text-center">
          <div className="delete-icon">
            <Icons.Delete />
          </div>
          <p>Êtes-vous sûr de vouloir supprimer</p>
          <p className="delete-name">{user?.name} ?</p>
          <p className="delete-warning">Cette action est irréversible.</p>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Annuler</button>
          <button className="btn-danger" onClick={() => onConfirm(user.id)}>Supprimer</button>
        </div>
      </div>
    </div>
  );

  // ===== LIGNE TABLEAU =====
  const UserRow = ({ user }) => {
    const isSelected = selectedUsers.includes(user.id);
    const roleColors = {
      admin: '#6366f1',
      hse: '#10b981',
      technicien: '#f59e0b',
      agent: '#8b5cf6'
    };
    
    return (
      <tr className={isSelected ? 'selected' : ''}>
        <td>
          <div className="checkbox">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => setSelectedUsers(prev => 
                prev.includes(user.id) ? prev.filter(id => id !== user.id) : [...prev, user.id]
              )}
            />
          </div>
        </td>
        <td>
          <div className="user-info">
            <div className="user-avatar" style={{ backgroundColor: roleColors[user.role] }}>
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
        </td>
        <td>
          <span className="role-badge" style={{ backgroundColor: roleColors[user.role] + '15', color: roleColors[user.role] }}>
            {user.role}
          </span>
        </td>
        <td>
          <span className={`status-badge ${user.status}`}>
            {user.status === 'active' ? 'Actif' : 'Inactif'}
          </span>
        </td>
        <td>{user.department}</td>
        <td>{user.location}</td>
        <td>
          <div className="last-active">
            <Icons.Activity />
            {new Date(user.lastActive).toLocaleDateString()}
          </div>
        </td>
        <td>
          <div className="actions">
            <button className="action-btn" onClick={() => handleToggleStatus(user.id)} title={user.status === 'active' ? 'Désactiver' : 'Activer'}>
              {user.status === 'active' ? <Icons.Lock /> : <Icons.Shield />}
            </button>
            <button className="action-btn" onClick={() => { setEditingUser(user); setShowModal(true); }} title="Modifier">
              <Icons.Edit />
            </button>
            <button className="action-btn delete" onClick={() => setDeleteConfirm(user)} title="Supprimer">
              <Icons.Delete />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="app">
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <Icons.Shield />
            <span className="logo-text">HSE Manager</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveView('dashboard')}
          >
            <Icons.Dashboard />
            <span>Tableau de bord</span>
          </button>
          <button 
            className={`nav-item ${activeView === 'users' ? 'active' : ''}`}
            onClick={() => setActiveView('users')}
          >
            <Icons.Users />
            <span>Utilisateurs</span>
            <span className="badge">{stats.total}</span>
          </button>
          <button 
            className="nav-item"
            onClick={() => navigate('/admin/historique')}
          >
            <Icons.History />
            <span>Historique</span>
          </button>
          <button 
            className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveView('settings')}
          >
            <Icons.Settings />
            <span>Paramètres</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => navigate('/')}>
            <Icons.Logout />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="main">
        {/* ===== TOP BAR ===== */}
        <header className="top-bar">
          <div className="top-bar-left">
            <h1>
              {activeView === 'dashboard' && 'Tableau de bord'}
              {activeView === 'users' && 'Gestion des utilisateurs'}
              {activeView === 'settings' && 'Paramètres'}
            </h1>
            <div className="date-time">
              <Icons.Calendar />
              <span>
                {currentTime.toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="separator">•</span>
              <span>{currentTime.toLocaleTimeString('fr-FR')}</span>
            </div>
          </div>

          <div className="top-bar-right">
            <div className="notifications">
              <button className="notif-btn" onClick={() => setShowNotifications(!showNotifications)}>
                <Icons.Bell />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="notif-badge">{notifications.filter(n => !n.read).length}</span>
                )}
              </button>
              
              {showNotifications && (
                <div className="notif-dropdown">
                  <div className="notif-header">
                    <h3>Notifications</h3>
                    <button onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}>
                      Tout marquer comme lu
                    </button>
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} className={`notif-item ${n.read ? '' : 'unread'}`} onClick={() => markNotificationAsRead(n.id)}>
                      <p>{n.text}</p>
                      <small>{n.time}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="user-profile">
              <div className="user-avatar">
                <Icons.User />
              </div>
              <div className="user-info">
                <span className="user-name">Admin</span>
                <span className="user-role">Administrateur</span>
              </div>
            </div>
          </div>
        </header>

        {/* ===== CONTENT ===== */}
        <div className="content">
          {activeView === 'dashboard' && (
            <div className="dashboard">
              <div className="stats-grid">
                <StatCard icon={Icons.Users} title="Total" value={stats.total} trend="+12%" />
                <StatCard icon={Icons.Check} title="Actifs" value={stats.active} trend="+5%" />
                <StatCard icon={Icons.Shield} title="Administrateurs" value={stats.admins} />
                <StatCard icon={Icons.Globe} title="HSE" value={stats.hse} />
              </div>

              <div className="recent-activity">
                <h2>Activité récente</h2>
                <div className="activity-list">
                  {users.slice(0, 3).map(user => (
                    <div key={user.id} className="activity-item">
                      <div className="activity-avatar" style={{ backgroundColor: '#6366f1' }}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="activity-content">
                        <p><strong>{user.name}</strong> s'est connecté</p>
                        <small>{new Date(user.lastActive).toLocaleString()}</small>
                      </div>
                      <span className={`activity-status ${user.status}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'users' && (
            <div className="users-view">
              {/* BARRE D'OUTILS */}
              <div className="toolbar">
                <div className="search-box">
                  <Icons.Search />
                  <input
                    type="text"
                    placeholder="Rechercher un utilisateur..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="toolbar-actions">
                  <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
                    <Icons.Filter />
                    Filtres
                    {(roleFilter !== 'all' || statusFilter !== 'all') && <span className="filter-dot" />}
                  </button>

                  <button className="btn-primary" onClick={() => { setEditingUser(null); setShowModal(true); }}>
                    <Icons.Plus />
                    Nouvel utilisateur
                  </button>
                </div>
              </div>

              {/* FILTRES */}
              {showFilters && (
                <div className="filters">
                  <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                    <option value="all">Tous les rôles</option>
                    <option value="admin">Administrateur</option>
                    <option value="hse">HSE</option>
                    <option value="technicien">Technicien</option>
                    <option value="agent">Agent</option>
                  </select>

                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">Tous les statuts</option>
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>
                </div>
              )}

              {/* ACTIONS GROUPÉES */}
              {selectedUsers.length > 0 && (
                <div className="bulk-actions">
                  <span className="selected-count">{selectedUsers.length} sélectionné(s)</span>
                  <div className="bulk-buttons">
                    <button className="bulk-btn" onClick={handleBulkActivate}>Activer</button>
                    <button className="bulk-btn" onClick={handleBulkDeactivate}>Désactiver</button>
                    <button className="bulk-btn danger" onClick={handleBulkDelete}>Supprimer</button>
                    <button className="bulk-btn" onClick={() => setSelectedUsers([])}>Annuler</button>
                  </div>
                </div>
              )}

              {/* TABLEAU */}
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}>
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                            onChange={handleSelectAll}
                          />
                        </div>
                      </th>
                      <th>Utilisateur</th>
                      <th>Rôle</th>
                      <th>Statut</th>
                      <th>Département</th>
                      <th>Localisation</th>
                      <th>Dernière activité</th>
                      <th style={{ width: '120px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <UserRow key={user.id} user={user} />
                    ))}
                  </tbody>
                </table>

                {filteredUsers.length === 0 && (
                  <div className="empty-state">
                    <p>Aucun utilisateur trouvé</p>
                  </div>
                )}
              </div>

              {/* PAGINATION */}
              <div className="pagination">
                <span className="pagination-info">
                  Affichage 1-{filteredUsers.length} sur {filteredUsers.length}
                </span>
                <div className="pagination-controls">
                  <button className="page-btn" disabled><Icons.ChevronLeft /></button>
                  <button className="page-btn active">1</button>
                  <button className="page-btn" disabled><Icons.ChevronRight /></button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ===== MODALS ===== */}
      {showModal && (
        <UserModal
          user={editingUser}
          onClose={() => { setShowModal(false); setEditingUser(null); }}
          onSave={editingUser ? handleEditUser : handleAddUser}
        />
      )}

      {deleteConfirm && (
        <DeleteModal
          user={deleteConfirm}
          onConfirm={handleDeleteUser}
          onClose={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin } = require('../controllers/authController');

router.post('/login', loginAdmin);
router.post('/register', registerAdmin); // ← À supprimer APRÈS avoir créé l'admin

module.exports = router;
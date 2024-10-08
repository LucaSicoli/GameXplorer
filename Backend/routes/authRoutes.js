const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser); // Esta es la ruta que estamos probando

module.exports = router;

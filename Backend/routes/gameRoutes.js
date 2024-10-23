const express = require('express');
const { createGame, getGames, getGamesByName, deleteGameByName } = require('../controllers/gameController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware de autenticación
const roleMiddleware = require('../middleware/roleMiddleware'); // Middleware de roles
const upload = require('../middleware/upload'); // Middleware de Multer

const router = express.Router();

// Ruta para crear un juego (Solo para usuarios con rol 'empresa')
router.post(
    '/',
    authMiddleware,            // Verificar que el usuario esté autenticado
    roleMiddleware('empresa'),  // Verificar que el usuario tenga el rol 'empresa'
    upload.single('image'),     // Procesar la imagen con Multer
    createGame                  // Ejecutar el controlador
);

// Ruta para obtener todos los juegos
router.get('/', authMiddleware, getGames);

// Ruta para buscar juegos por nombre
router.get('/search', authMiddleware, getGamesByName);

// Ruta para eliminar un juego por nombre
router.delete('/', authMiddleware, deleteGameByName);

module.exports = router;

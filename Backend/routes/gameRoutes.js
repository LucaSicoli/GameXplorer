const express = require('express');
const { createGame, getGames, getGamesByName, deleteGameByName } = require('../controllers/gameController');  
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Crear un nuevo videojuego
router.post('/', authMiddleware, createGame);

// Obtener todos los videojuegos
router.get('/', authMiddleware, getGames);

// Buscar videojuegos por nombre
router.get('/search', authMiddleware, getGamesByName);

// Eliminar un videojuego por nombre
router.delete('/', authMiddleware, deleteGameByName);

module.exports = router;

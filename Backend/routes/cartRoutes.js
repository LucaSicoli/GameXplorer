const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas del carrito
router.post('/add', authMiddleware, addToCart);
router.get('/', authMiddleware, getCart);
router.delete('/remove', authMiddleware, removeFromCart);

module.exports = router; // Asegúrate de exportar el router

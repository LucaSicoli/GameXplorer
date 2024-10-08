const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/orderController'); // Importar las funciones del controlador
const authMiddleware = require('../middleware/authMiddleware');  // Middleware de autenticación
const router = express.Router();

// Ruta para crear una nueva orden
router.post('/', authMiddleware, createOrder);

// Ruta para obtener las órdenes del usuario autenticado
router.get('/', authMiddleware, getUserOrders);

module.exports = router;

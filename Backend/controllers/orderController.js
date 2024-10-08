const Order = require('../models/order');  // Si el archivo es 'order.js'
const Game = require('../models/Game');

// Crear una nueva orden (compra de videojuego)
exports.createOrder = async (req, res) => {
    const { gameId } = req.body;

    try {
        // Buscar el videojuego
        const game = await Game.findById(gameId);
        if (!game) {
            return res.status(404).json({ message: 'Videojuego no encontrado' });
        }

        // Crear una nueva orden
        const order = new Order({
            user: req.user._id,
            game: gameId,
            price: game.price,
        });
        await order.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener las órdenes del usuario autenticado
exports.getUserOrders = async (req, res) => {
    try {
        // Buscar todas las órdenes del usuario autenticado
        const orders = await Order.find({ user: req.user._id }).populate('game');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Cart = require('../models/cart');
const Game = require('../models/Game');

// Agregar un juego al carrito
exports.addToCart = async (req, res) => {
    const { gameId, quantity } = req.body;

    try {
        const game = await Game.findById(gameId);
        if (!game) return res.status(404).json({ message: 'Juego no encontrado.' });

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                items: [{ game: gameId, quantity }],
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.game.toString() === gameId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity; // Actualizar cantidad si el juego ya existe
            } else {
                cart.items.push({ game: gameId, quantity }); // Agregar nuevo juego
            }
        }

        await cart.save();
        res.status(201).json({ message: 'Juego agregado al carrito.', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ver el carrito del usuario
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.game', 'name price');
        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: 'El carrito está vacío.' });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un juego del carrito
exports.removeFromCart = async (req, res) => {
    const { gameId } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: 'El carrito está vacío. No se puede eliminar ningún juego.' });
        }

        const itemIndex = cart.items.findIndex(item => item.game.toString() === gameId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'El juego no se encuentra en el carrito.' });
        }

        // Eliminar el juego del carrito
        cart.items.splice(itemIndex, 1);
        await cart.save();

        res.json({ message: 'Juego eliminado del carrito.', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

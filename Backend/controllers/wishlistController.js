const Wishlist = require('../models/Wishlist');
const Game = require('../models/Game');

// Agregar un videojuego a la wishlist por nombre
exports.addToWishlist = async (req, res) => {
    const { name } = req.body;

    try {
        // Buscar el juego por nombre
        const game = await Game.findOne({ name });
        if (!game) {
            return res.status(404).json({ message: 'Videojuego no encontrado' });
        }

        // Verificar si ya existe una wishlist para este usuario
        let wishlist = await Wishlist.findOne({ user: req.user._id });
        
        if (!wishlist) {
            // Si no existe, crear una nueva wishlist
            wishlist = new Wishlist({
                user: req.user._id,
                games: [game._id]
            });
        } else {
            // Si ya existe, agregar el juego si no está ya en la lista
            if (wishlist.games.includes(game._id)) {
                return res.status(400).json({ message: 'El videojuego ya está en la wishlist' });
            }
            wishlist.games.push(game._id);
        }

        // Guardar la wishlist
        await wishlist.save();
        res.status(201).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener la wishlist del usuario autenticado
exports.getWishlist = async (req, res) => {
    try {
        // Buscar la wishlist del usuario y popular con los detalles de los juegos
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('games');

        if (!wishlist) {
            return res.status(404).json({ message: 'No se encontró una wishlist para este usuario' });
        }

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un videojuego de la wishlist por nombre
exports.removeFromWishlist = async (req, res) => {
    const { name } = req.body;

    try {
        // Buscar el juego por nombre
        const game = await Game.findOne({ name });
        if (!game) {
            return res.status(404).json({ message: 'Videojuego no encontrado' });
        }

        // Buscar la wishlist del usuario
        let wishlist = await Wishlist.findOne({ user: req.user._id });
        if (!wishlist) {
            return res.status(404).json({ message: 'No se encontró una wishlist para este usuario' });
        }

        // Verificar si el juego está en la wishlist
        if (!wishlist.games.includes(game._id)) {
            return res.status(404).json({ message: 'El videojuego no está en la wishlist' });
        }

        // Eliminar el juego de la wishlist
        wishlist.games = wishlist.games.filter(gameId => gameId.toString() !== game._id.toString());

        // Guardar la wishlist actualizada
        await wishlist.save();
        res.json({ message: 'Videojuego eliminado de la wishlist', wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

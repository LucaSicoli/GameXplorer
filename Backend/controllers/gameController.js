const Game = require('../models/Game');

// Crear un nuevo videojuego
exports.createGame = async (req, res) => {
    const { name, category, description, systemRequirements, price } = req.body;

    try {
        const game = new Game({
            name,
            category,
            description,
            systemRequirements,
            price,
            developer: req.user._id  // El usuario autenticado es el desarrollador
        });
        await game.save();
        res.status(201).json(game);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los videojuegos
exports.getGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar videojuegos por nombre
// Buscar videojuegos por nombre (ahora desde el body)
exports.getGamesByName = async (req, res) => {
    const { name } = req.body;  // Tomamos el nombre del body

    try {
        const games = await Game.find({ name: { $regex: name, $options: 'i' } });  // 'i' para insensible a mayúsculas/minúsculas
        if (games.length === 0) {
            return res.status(404).json({ message: 'No se encontraron videojuegos con ese nombre' });
        }
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteGameByName = async (req, res) => {
    const { name } = req.body;
    try {
        const game = await Game.findOneAndDelete({ name });
        if (!game) {
            return res.status(404).json({ message: 'Videojuego no encontrado' });
        }
        res.json({ message: `El juego ${name} ha sido eliminado.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


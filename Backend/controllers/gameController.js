const { storage } = require('../config/firebase'); // Firebase Storage
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage'); // Funciones de Firebase Storage
const { v4: uuidv4 } = require('uuid'); // Generar identificador único
const Game = require('../models/Game'); // Modelo de Juego

// Crear un nuevo videojuego con imagen
exports.createGame = async (req, res) => {
    const { name, category, description, systemRequirements, price } = req.body;
    const image = req.file;

    try {
        if (!image) {
            return res.status(400).json({ message: 'La imagen es obligatoria' });
        }

        // Crear una referencia en Firebase Storage
        const storageRef = ref(storage, `games/${uuidv4()}_${image.originalname}`);

        // Subir la imagen a Firebase Storage usando el buffer de Multer
        await uploadBytes(storageRef, image.buffer);

        // Obtener la URL pública de la imagen
        const imageUrl = await getDownloadURL(storageRef);

        // Crear y guardar el juego en la base de datos
        const game = new Game({
            name,
            category,
            description,
            systemRequirements,
            price,
            imageUrl,
            developer: req.user._id,
        });

        await game.save();
        res.status(201).json(game); // Responder con el juego creado
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejar errores
    }
};


// Obtener todos los videojuegos
exports.getGames = async (req, res) => {
    try {
        const games = await Game.find(); // Buscar todos los juegos
        res.json(games); // Enviar los juegos como respuesta
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejar errores
    }
};

// Buscar videojuegos por nombre
exports.getGamesByName = async (req, res) => {
    const { name } = req.body; // Obtener el nombre del body

    try {
        const games = await Game.find({ name: { $regex: name, $options: 'i' } }); // Buscar con regex
        if (games.length === 0) {
            return res.status(404).json({ message: 'No se encontraron videojuegos con ese nombre' });
        }
        res.json(games); // Responder con los juegos encontrados
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejar errores
    }
};

// Eliminar un videojuego por nombre
exports.deleteGameByName = async (req, res) => {
    const { name } = req.body; // Obtener el nombre del body

    try {
        const game = await Game.findOneAndDelete({ name }); // Buscar y eliminar el juego
        if (!game) {
            return res.status(404).json({ message: 'Videojuego no encontrado' });
        }
        res.json({ message: `El juego ${name} ha sido eliminado.` }); // Confirmación de eliminación
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejar errores
    }
};

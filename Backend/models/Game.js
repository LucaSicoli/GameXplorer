const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    systemRequirements: {
        minimum: String,
        recommended: String,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {  // Nueva propiedad para la URL de la imagen
        type: String,
        required: true, // Asegura que siempre haya una imagen asociada
    },
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true }); // Agrega campos 'createdAt' y 'updatedAt' automáticamente

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;

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
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;

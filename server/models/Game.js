const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    user1Grid: [[Number]],
    user2Grid: [[Number]],
    user1CutNumbers: [Number],
    user2CutNumbers: [Number],
    gameStatus: {
        type: String,
        enum: ['waiting', 'in_progress', 'completed'],
        default: 'waiting'
    },
    winner: {
        type: String,
        enum: ['none', 'user1', 'user2'],
        default: 'none'
    },
    generatedNumbers: [Number]
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
const Game = require('../models/Game');

const gameController = {
    startGame: async (req, res) => {
        try {
            const { user1Grid, user2Grid } = req.body;

            // Validate grids
            if (!isValidGrid(user1Grid) || !isValidGrid(user2Grid)) {
                return res.status(400).json({ error: 'Invalid grid format' });
            }

            const game = new Game({
                user1Grid,
                user2Grid,
                gameStatus: 'in_progress',
                user1CutNumbers: [],
                user2CutNumbers: []
            });

            await game.save();
            res.json(game);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateGame: async (req, res) => {
        try {
            const { gameId, number } = req.body;
            const game = await Game.findById(gameId);

            if (!game) {
                return res.status(404).json({ error: 'Game not found' });
            }

            // Update cut numbers for both users
            if (containsNumber(game.user1Grid, number)) {
                game.user1CutNumbers.push(number);
            }
            if (containsNumber(game.user2Grid, number)) {
                game.user2CutNumbers.push(number);
            }

            game.generatedNumbers.push(number);

            // Check for winner
            const winner = checkWinner(game);
            if (winner) {
                game.winner = winner;
                game.gameStatus = 'completed';
            }

            await game.save();
            res.json(game);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

// Helper functions
function isValidGrid(grid) {
    if (!Array.isArray(grid) || grid.length !== 3) return false;
    const numbers = new Set();

    for (let row of grid) {
        if (!Array.isArray(row) || row.length !== 3) return false;
        for (let num of row) {
            if (typeof num !== 'number' || num < 1 || num > 9 || numbers.has(num)) {
                return false;
            }
            numbers.add(num);
        }
    }

    return numbers.size === 9;
}

function containsNumber(grid, number) {
    return grid.some(row => row.includes(number));
}

function checkWinner(game) {
    // Check rows and columns for user1
    if (hasWinningLine(game.user1Grid, game.user1CutNumbers)) {
        return 'user1';
    }
    // Check rows and columns for user2
    if (hasWinningLine(game.user2Grid, game.user2CutNumbers)) {
        return 'user2';
    }
    return null;
}

function hasWinningLine(grid, cutNumbers) {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (grid[i].every(num => cutNumbers.includes(num))) {
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (grid.every(row => cutNumbers.includes(row[i]))) {
            return true;
        }
    }

    return false;
}

module.exports = gameController;
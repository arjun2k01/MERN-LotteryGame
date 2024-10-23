const express = require('express');
const router = express.Router();

router.post('/start', (req, res) => {
    const { user1Grid, user2Grid } = req.body;
    // Logic for starting the game
    res.json({ message: 'Game started successfully' });
});

router.post('/update', (req, res) => {
    const { gameId, number } = req.body;
    // Logic for updating the game
    res.json({ message: 'Game updated successfully' });
});

module.exports = router;

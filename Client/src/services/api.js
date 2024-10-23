const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);


export const startGame = async (user1Grid, user2Grid) => {
    try {
        const response = await fetch(`${API_URL}/game/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user1Grid, user2Grid })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        throw new Error('Failed to start game: ' + error.message);
    }
};

export const updateGame = async (gameId, number) => {
    try {
        const response = await fetch(`${API_URL}/game/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameId, number })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        throw new Error('Failed to update game: ' + error.message);
    }
};
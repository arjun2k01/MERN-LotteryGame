import React, { useState } from ".pnpm/react@18.3.1/node_modules/react";
import Grid from "./Grid";
import NumberGenerator from "./NumberGenerator";
import { startGame, updateGame } from "../services/api";

const GameBoard = () => {
  const [game, setGame] = useState(null);
  const [user1Grid, setUser1Grid] = useState(
    Array(3)
      .fill()
      .map(() => Array(3).fill(null))
  );
  const [user2Grid, setUser2Grid] = useState(
    Array(3)
      .fill()
      .map(() => Array(3).fill(null))
  );
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isValidGrids = () => {
    const isValidGrid = (grid) => {
      const numbers = new Set();
      return grid.every((row) =>
        row.every(
          (num) => num >= 1 && num <= 9 && !numbers.has(num) && numbers.add(num)
        )
      );
    };

    return isValidGrid(user1Grid) && isValidGrid(user2Grid);
  };

  const handleStartGame = async () => {
    if (!isValidGrids()) {
      setError("Please fill both grids with valid numbers (1-9, no repeats)");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const gameData = await startGame(user1Grid, user2Grid);
      setGame(gameData);
      setIsGameStarted(true);
    } catch (error) {
      setError("Failed to start game: " + error.message);
      console.error("Error starting game:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNumberGenerated = async (number) => {
    try {
      setLoading(true);
      setError(null);
      const updatedGame = await updateGame(game._id, number);
      setGame(updatedGame);

      // Update user grids based on the generated number
      const updatedUser1Grid = user1Grid.map(
        (row) => row.map((num) => (num === number ? null : num)) // Cut logic
      );
      const updatedUser2Grid = user2Grid.map(
        (row) => row.map((num) => (num === number ? null : num)) // Cut logic
      );

      setUser1Grid(updatedUser1Grid);
      setUser2Grid(updatedUser2Grid);

      // Check for winner
      if (updatedGame.winner) {
        setGameOver(true);
        alert(`${updatedGame.winner === "user1" ? "User 1" : "User 2"} wins!`);
      }
    } catch (error) {
      setError("Error updating game: " + error.message);
      console.error("Error updating game:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUser1Grid(
      Array(3)
        .fill()
        .map(() => Array(3).fill(null))
    );
    setUser2Grid(
      Array(3)
        .fill()
        .map(() => Array(3).fill(null))
    );
    setGame(null);
    setIsGameStarted(false);
    setGameOver(false);
    setError(null);
  };

  return (
    <div className="game-board">
      <h1>El Loteria Game</h1>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading...</div>}

      <div className="grids-container">
        <div className="grid-wrapper">
          <h2>User 1</h2>
          <Grid
            grid={user1Grid}
            cutNumbers={game?.user1CutNumbers || []}
            onNumberInput={(row, col, num) => {
              const newGrid = [...user1Grid];
              newGrid[row][col] = num;
              setUser1Grid(newGrid);
            }}
            isEditable={!isGameStarted}
          />
        </div>

        <div className="grid-wrapper">
          <h2>User 2</h2>
          <Grid
            grid={user2Grid}
            cutNumbers={game?.user2CutNumbers || []}
            onNumberInput={(row, col, num) => {
              const newGrid = [...user2Grid];
              newGrid[row][col] = num;
              setUser2Grid(newGrid);
            }}
            isEditable={!isGameStarted}
          />
        </div>
      </div>

      <div className="controls">
        {!isGameStarted ? (
          <button onClick={handleStartGame} disabled={loading}>
            Start Game
          </button>
        ) : (
          <>
            <NumberGenerator
              isGameStarted={isGameStarted}
              onNumberGenerated={handleNumberGenerated}
              gameOver={gameOver}
              disabled={loading}
            />
            {gameOver && (
              <button
                onClick={handleReset}
                className="reset-button"
                disabled={loading}
              >
                New Game
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GameBoard;

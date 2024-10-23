import React from ".pnpm/react@18.3.1/node_modules/react";

const Grid = ({ grid, cutNumbers, onNumberInput, isEditable }) => {
  const handleInput = (row, col, value) => {
    const num = parseInt(value);
    // Allow only valid numbers to be set in the grid
    if (!isNaN(num) && num >= 1 && num <= 9) {
      onNumberInput(row, col, num);
    }
  };

  const isCut = (number) => cutNumbers.includes(number); // Check if the number is cut

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              min="1"
              max="9"
              value={cell || ""}
              onChange={(e) => handleInput(rowIndex, colIndex, e.target.value)}
              className={`grid-cell ${isCut(cell) ? "cut" : ""}`} // Apply cut class if necessary
              disabled={!isEditable || isCut(cell)} // Disable input if not editable or if it's cut
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;

// client/src/components/NumberGenerator.jsx
import React, {
  useState,
  useEffect,
} from ".pnpm/react@18.3.1/node_modules/react";

const NumberGenerator = ({
  isGameStarted,
  onNumberGenerated,
  gameOver,
  disabled,
}) => {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [usedNumbers, setUsedNumbers] = useState(new Set());

  const generateNumber = () => {
    if (usedNumbers.size >= 9) {
      return null;
    }

    let number;
    do {
      number = Math.floor(Math.random() * 9) + 1;
    } while (usedNumbers.has(number));

    setCurrentNumber(number);
    setUsedNumbers(new Set([...usedNumbers, number]));
    onNumberGenerated(number);
  };

  return (
    <div className="number-generator">
      <h3>Number Generator</h3>
      {currentNumber && (
        <div className="current-number-display">{currentNumber}</div>
      )}
      <button
        onClick={generateNumber}
        disabled={disabled || gameOver || usedNumbers.size >= 9}
      >
        Generate Number
      </button>
      <div className="remaining-numbers">
        Remaining numbers: {9 - usedNumbers.size}
      </div>
    </div>
  );
};

export default NumberGenerator;

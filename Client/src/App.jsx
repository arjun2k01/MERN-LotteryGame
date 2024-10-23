import React from ".pnpm/react@18.3.1/node_modules/react";

import "./styles.css";
import GameBoard from "./components/GameBoard";

const App = () => {
  return (
    <div className="app">
      <GameBoard />
    </div>
  );
};

export default App;

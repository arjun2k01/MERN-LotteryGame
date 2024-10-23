import React from '.pnpm/react@18.3.1/node_modules/react';
import { createRoot } from '.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/client';

import './styles.css';
import App from './App.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <App />
);

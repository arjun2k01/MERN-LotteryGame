import React from 'react'; // Corrected import for React
import { createRoot } from 'react-dom/client'; // Corrected import for createRoot

import './styles.css';
import App from './App.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <App />
);

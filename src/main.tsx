import React from 'react';
// @ts-ignore
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>

);
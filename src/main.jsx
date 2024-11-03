import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './Auth/AuthProvider';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
);

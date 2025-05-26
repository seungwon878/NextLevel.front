import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/CommonPage.css';
import { AuthProvider } from './AuthContext';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('root element not found');

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

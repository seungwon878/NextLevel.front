import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SignupSuccess from './pages/SignupSuccess';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { AuthProvider, useAuth } from './AuthContext';

function App() {
  const {isAuthenticated} = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/main" /> : <LoginPage />} />
        <Route path="/main" element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signupsuccess" element={<SignupSuccess />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
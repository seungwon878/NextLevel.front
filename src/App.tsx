import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import SignupSuccess from './SignupSuccessPage/SignupSuccess';
import ForgotPasswordPage from './ForgotPasswordPage/ForgotPasswordPage';
import MyPage from './MyPage/MyPage'
import { useAuth } from './AuthContext';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/main" /> : <LoginPage />}
        />
        <Route path="/main" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signupsuccess" element={<SignupSuccess />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

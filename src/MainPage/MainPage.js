import React, { useState } from 'react';
import './MainPage.css';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  return (
    <div className="main-bg">
      <header className="main-header">
        <div className="logo">Logo</div>
        <nav className="main-nav">
          <a href="#" className="nav-link">문제 게시판</a>
          <a href="#" className="nav-link">프로젝트 팀</a>
          <a href="#" className="nav-link">Q&A 게시판</a>
          <a href="#" className="nav-link">채팅</a>
        </nav>
        <div className="main-actions">
          {isAuthenticated ? (
            <button className="login-btn" onClick={handleLogout}>LOGOUT</button>
          ) : (
            <button className="login-btn" onClick={handleLogin}>LOGIN</button>
          )}
          <button className="register-btn" onClick={() => navigate('/signup')}>register</button>
        </div>
      </header>
      <main className="main-content">
        <h2 className="main-title">그냥 이미지 넣고 설명글 넣는 맨 처음 초기 화면</h2>
        <div className="main-card">
          <div className="main-card-title">Content</div>
          <div className="main-card-bar"></div>
          <div className="main-card-bar short"></div>
          <div className="main-card-lines">
            <div className="main-card-line"></div>
            <div className="main-card-line"></div>
            <div className="main-card-line"></div>
            <div className="main-card-line"></div>
            <div className="main-card-line short"></div>
          </div>
          <div className="main-card-buttons">
            <button className="main-large-btn">Large</button>
            <button className="main-large-btn">Large</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;

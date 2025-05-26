import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LandingPage: React.FC = () => {
  const {isAuthenticated, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <style>{`
        body, html {
          background: #f5f7fa;
          font-family: 'Pretendard', 'Inter', sans-serif;
          margin: 0;
          padding: 0;
        }
        .main-bg {
          min-height: 100vh;
          background: #f5f7fa;
        }
        .main-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 48px 0 48px;
          background: #f5f7fa;
        }
        .logo {
          font-size: 1.1rem;
          font-weight: 700;
          background: #222c37;
          color: #fff;
          border-radius: 6px;
          padding: 8px 28px;
          letter-spacing: 1px;
          cursor: pointer;
        }
        .main-nav {
          flex: 1;
          display: flex;
          justify-content: center;
          gap: 36px;
        }
        .nav-link {
          color: #222c37;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          padding: 0 8px;
        }
        .main-actions {
          display: flex;
          gap: 12px;
        }
        .login-btn {
          background: #fff;
          color: #222c37;
          border: 2px solid #222c37;
          border-radius: 6px;
          padding: 8px 28px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .login-btn:hover {
          background: #222c37;
          color: #fff;
        }
        .register-btn {
          background: #222c37;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 8px 18px;
          font-weight: 500;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .register-btn:hover {
          background: #3a4560;
        }
        .main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 64px;
        }
        .main-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 32px;
          color: #222c37;
          text-align: center;
        }
        .main-card {
          background: #e9ecf2;
          border-radius: 10px;
          padding: 32px 32px 28px 32px;
          width: 420px;
          box-sizing: border-box;
          margin-bottom: 32px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .main-card-title {
          font-size: 1rem;
          color: #666;
          margin-bottom: 12px;
        }
        .main-card-bar {
          width: 100%;
          height: 36px;
          background: #a8b2c1;
          border-radius: 6px;
          margin-bottom: 12px;
        }
        .main-card-bar.short {
          width: 60%;
          height: 24px;
          background: #a8b2c1;
          border-radius: 6px;
          margin-bottom: 16px;
        }
        .main-card-lines {
          width: 100%;
          margin-bottom: 18px;
        }
        .main-card-line {
          height: 10px;
          background: #bfc6d1;
          border-radius: 4px;
          margin-bottom: 6px;
          width: 100%;
        }
        .main-card-line.short {
          width: 60%;
        }
        .main-card-buttons {
          display: flex;
          gap: 18px;
          margin-top: 14px;
        }
        .main-large-btn {
          background: #222c37;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 10px 32px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .main-large-btn:hover {
          background: #3a4560;
        }
        @media (max-width: 700px) {
          .main-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
            padding: 18px 8vw 0 8vw;
          }
          .main-content {
            margin-top: 24px;
          }
          .main-card {
            width: 98vw;
            min-width: 0;
            padding: 18px 8px 14px 8px;
          }
        }
      `}</style>
      <div className="main-bg">
        <header className="main-header">
          <button className="logo" onClick={() => navigate('/main')}>Logo</button>
          <nav className="main-nav">
            <a href="#" className="nav-link">문제 게시판</a>
            <a href="#" className="nav-link">프로젝트 팀</a>
            <a href="#" className="nav-link">Q&A 게시판</a>
            <a href="#" className="nav-link">채팅</a>
          </nav>
          <div className="main-actions">
            {isAuthenticated ? (
              <>
                <button className="login-btn" onClick={handleLogout}>LOGOUT</button>
                <button className="register-btn" onClick={() => navigate('/mypage')}>MyPage</button>
              </>
            ) : (
              <>
                <button className="login-btn" onClick={handleLogin}>LOGIN</button>
                <button className="register-btn" onClick={() => navigate('/signup')}>register</button>
              </>
            )}
            
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
    </>
  );
};

export default LandingPage;

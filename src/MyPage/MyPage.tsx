import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const MyPage: React.FC = () => {
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
        .mypage-bg {
          min-height: 100vh;
          background: #f5f7fa;
        }
        .mypage-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 48px 0 48px;
          background: #f5f7fa;
        }
        .mypage-logo {
          font-size: 1.1rem;
          font-weight: 700;
          background: #222c37;
          color: #fff;
          border-radius: 6px;
          padding: 8px 28px;
          letter-spacing: 1px;
          cursor: pointer;
        }
        .mypage-nav {
          flex: 1;
          display: flex;
          justify-content: center;
          gap: 36px;
        }
        .mypage-nav-link {
          color: #222c37;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          padding: 0 8px;
        }
        .mypage-actions {
          display: flex;
          gap: 12px;
        }
        .mypage-login-btn {
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
        .mypage-login-btn:hover {
          background: #222c37;
          color: #fff;
        }
        .mypage-register-btn {
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
        .mypage-register-btn:hover {
          background: #3a4560;
        }
        .mypage-main {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-start;
          gap: 40px;
          margin-top: 40px;
        }
        .mypage-profile-card {
          background: #fff;
          border: 1.5px solid #b2d3f5;
          border-radius: 12px;
          box-shadow: 0 4px 24px 0 rgba(0,0,0,0.06);
          width: 320px;
          min-height: 360px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 24px 24px 24px;
        }
        .mypage-profile-img {
          width: 96px;
          height: 96px;
          border-radius: 12px;
          background: #e9ecf2;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          font-size: 2.5rem;
          color: #bbb;
        }
        .mypage-profile-name {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .mypage-profile-desc {
          font-size: 0.98rem;
          color: #666;
          margin-bottom: 24px;
          text-align: center;
          min-height: 40px;
        }
        .mypage-profile-edit-btn {
          margin-top: auto;
          background: #222c37;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 10px 24px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .mypage-profile-edit-btn:hover {
          background: #3a4560;
        }
        .mypage-shortcuts {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 420px;
        }
        .mypage-shortcut-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f5f7fa;
          border: 2px solid #222c37;
          border-radius: 10px;
          padding: 24px 32px;
          font-size: 1.08rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, border 0.2s;
        }
        .mypage-shortcut-btn:hover {
          background: #e9ecf2;
          border: 2px solid #3a4560;
        }
        .mypage-shortcut-arrow {
          font-size: 2em;
          color: #222c37;
        }
        @media (max-width: 900px) {
          .mypage-main {
            flex-direction: column;
            align-items: center;
            gap: 24px;
          }
          .mypage-shortcuts {
            width: 98vw;
            min-width: 0;
          }
        }
      `}</style>
      <div className="mypage-bg">
        <header className="mypage-header">
          <button className="mypage-logo" onClick={() => navigate('/main')}>Logo</button>
          <nav className="mypage-nav">
            <a href="#" className="mypage-nav-link">문제 게시판</a>
            <a href="#" className="mypage-nav-link">프로젝트 팀</a>
            <a href="#" className="mypage-nav-link">Q&A 게시판</a>
            <a href="#" className="mypage-nav-link">채팅</a>
          </nav>
          <div className="mypage-actions">
            {isAuthenticated ? (
              <>
                <button className="mypage-login-btn" onClick={handleLogout}>LOGOUT</button>
                <button className="mypage-register-btn" onClick={() => navigate('/mypage')}>MyPage</button>
              </>
            ) : (
              <>
                <button className="login-btn" onClick={handleLogin}>LOGIN</button>
                <button className="register-btn" onClick={() => navigate('/signup')}>register</button>
              </>
            )}
          </div>
        </header>
        <main className="mypage-main">
          {/* 좌측 프로필 카드 */}
          <div className="mypage-profile-card">
            <div className="mypage-profile-img">
              {/* 이미지 없을 때 기본 아이콘/이니셜 */}
              <span role="img" aria-label="profile">🖼️</span>
            </div>
            <div className="mypage-profile-name">홍길동</div>
            <div className="mypage-profile-desc">
              프로필 내용<br/>
              (자기소개, 취미, 주요 이력 등)<br/>
              메이저/프로젝트/기타 메시지도 포함
            </div>
            <button className="mypage-profile-edit-btn">정보 수정</button>
          </div>
          {/* 우측 바로가기 버튼 3개 */}
          <div className="mypage-shortcuts">
            <button className="mypage-shortcut-btn">
              <span>내가 올린 문제 게시판 확인하러 가기</span>
              <span className="mypage-shortcut-arrow">↓</span>
            </button>
            <button className="mypage-shortcut-btn">
              <span>내가 올린 팀 구인 글 확인하러 가기</span>
              <span className="mypage-shortcut-arrow">↓</span>
            </button>
            <button className="mypage-shortcut-btn">
              <span>내가 올린 Q&amp;A 확인하러 가기</span>
              <span className="mypage-shortcut-arrow">↓</span>
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default MyPage;

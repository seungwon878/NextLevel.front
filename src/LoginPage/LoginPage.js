import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../Input/FormInput';
import PasswordInput from '../Input/PasswordInput';
import '../styles/CommonPage.css';
import './LoginPage.css';
import { useAuth } from '../AuthContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef();
  const { login } = useAuth();

  useEffect(() => {
    const remembered = localStorage.getItem('rememberMe') === 'true';
    const savedUsername = remembered ? localStorage.getItem('username') : '';
    setRemember(remembered);
    setUsername(savedUsername || '');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://52.78.159.151:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        switch (result.statusMessage) {
          case "NOT_FOUND":
            result.statusMessage = '존재하지 않는 아이디입니다.';
            break;
          case "BAD_CREDENTIALS":
            result.statusMessage = '아이디와 비밀번호가 일치하지 않습니다.';
            break;
          default:
        }
        throw new Error(result.statusMessage || '로그인 실패');
      }
      alert('로그인 성공!');
      if (remember) {
        localStorage.setItem('username', username);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('username');
        localStorage.setItem('rememberMe', 'false');
      }

      // 추가: 페이지 이동 등
      login();
      navigate('/main');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="common-container">
      <div>
        <h3>Welcome !</h3>
        <h1>Sign in to</h1>
        <div className="subtitle">Lorem Ipsum is simply</div>
        <form className="login-form" onSubmit={handleSubmit} ref={formRef}>
          <FormInput
            label="User name"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter your user name"
            required
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your Password"
            required
          />
          <div className="login-options-row">
            <label className="remember-label">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <div className="login-link">
              Forgot password?
              <span
                className="register-link"
                onClick={() => navigate('/forgot')}
                tabIndex={0}
                role="button"
              >
                <b>Find password</b>
              </span>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? '처리 중...' : 'Login'}
          </button>
          <div className="register-row">
            Don’t have an Account ?{' '}
            <span
              className="register-link"
              onClick={() => {
                setPassword('');
                setTimeout(() => {
                  navigate('/signup');
                }, 750);
              }}
              tabIndex={0}
              role="button"
            >
              <b>Register</b>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

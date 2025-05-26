import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../Input/FormInput';
import PasswordInput from '../Input/PasswordInput';
import { useAuth } from '../AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const { login } = useAuth();

  useEffect(() => {
    const remembered = localStorage.getItem('rememberMe') === 'true';
    const savedUsername = remembered ? localStorage.getItem('username') : '';
    setRemember(remembered);
    setUsername(savedUsername || '');
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      login();
      navigate('/main');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };

  return (
    <>
      <style>{`
        .login-form-container {
          max-width: 400px;
          margin: 40px auto;
          padding: 40px 32px 32px 32px;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          border: 1.5px solid #e0e0e0;
        }
        .login-form-container h2 {
          margin-bottom: 0.2em;
          font-size: 1.1em;
          font-weight: 400;
        }
        .login-form-container h1 {
          margin: 0 0 0.2em 0;
          font-size: 2em;
          font-weight: bold;
          letter-spacing: -1px;
        }
        .login-form-container .subtitle {
          margin-bottom: 1.5em;
          color: #888;
          font-size: 1em;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.4em;
        }
        .options-row, .login-options-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5em;
          font-size: 0.97em;
        }
        .remember-label {
          display: flex;
          align-items: center;
          gap: 0.3em;
          font-size: 0.97em;
        }
        .forgot-link, .login-link {
          font-size: 0.97em;
          color: #888;
          text-decoration: none;
        }
        .login-btn {
          width: 100%;
          padding: 15px 0;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 1.15em;
          font-weight: 600;
          cursor: pointer;
          margin-top: 0.2em;
          transition: background 0.2s;
        }
        .login-btn:hover {
          background: #222;
        }
        .register-row {
          margin-top: 2.1em;
          text-align: center;
          color: #bbb;
          font-size: 1em;
        }
        .register-link {
          color: #111;
          text-decoration: none;
          font-weight: bold;
          margin-left: 6px;
          cursor: pointer;
        }
        .register-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 500px) {
          .login-form-container {
            padding: 20px 8px 16px 8px;
            max-width: 98vw;
          }
        }
      `}</style>
      <div className="login-form-container">
        <div>
          <h2>Welcome !</h2>
          <h1>Sign in to</h1>
          <div className="subtitle">Lorem Ipsum is simply</div>
          <form className="login-form" onSubmit={handleSubmit} ref={formRef}>
            <FormInput
              label="User name"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your user name"
              required
            />
            <PasswordInput
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your Password"
              required
            />
            <div className="login-options-row">
              <label className="remember-label">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={handleRememberChange}
                />
                Remember me
              </label>
              <div className="login-link">
                Forgot Password ?
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
    </>
  );
};

export default LoginPage;

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../Input/FormInput';
import PasswordInput from '../Input/PasswordInput';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  function validateEmail(email: string): boolean {
    // . 뒤에 2글자 이상
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !username || !password) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    if (password !== confirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!validateEmail(email)) {
      setError('이메일 형식이 잘못되었습니다.');
      return;
    }

    const formData = new FormData();
    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            username,
            password,
            email
          })
        ],
        { type: "application/json" }
      )
    );

    try {
      setIsLoading(true);
      const response = await fetch('http://52.78.159.151:8080/api/members/signup', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        switch (result.statusMessage) {
          case "DUPLICATED_MEMBER":
            result.statusMessage = '동일한 아이디가 존재합니다.';
            break;
          case "DUPLICATED_EMAIL":
            result.statusMessage = '동일한 이메일이 존재합니다.';
            break;
          default:
        }
        throw new Error(result.statusMessage || '회원가입 실패');
      }
      navigate('/signupsuccess');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleConfirmChange = (e: ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value);

  return (
    <>
      <style>{`
        .common-container {
          max-width: 400px;
          margin: 48px auto;
          padding: 40px 32px 32px 32px;
          background: #fff;
          border: 1.5px solid #b2d3f5;
          border-radius: 14px;
          box-shadow: 0 4px 24px 0 rgba(0,0,0,0.06);
          box-sizing: border-box;
        }
        .common-container h2 {
          margin-bottom: 0.2em;
          font-size: 1.1em;
          font-weight: 400;
        }
        .common-container h1 {
          margin: 0 0 0.2em 0;
          font-size: 2em;
          font-weight: bold;
          letter-spacing: -1px;
        }
        .subtitle {
          margin-bottom: 1.5em;
          color: #888;
          font-size: 1em;
        }
        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .register-button {
          width: 100%;
          padding: 13px 0;
          margin-top: 0.8em;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 1.08em;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .register-button:disabled {
          background: #888;
          cursor: not-allowed;
        }
        .error-message {
          margin-top: 0.8em;
          color: #d33;
          font-size: 0.98em;
          text-align: center;
        }
        .login-link {
          margin-top: 2.1em;
          text-align: center;
          color: #888;
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
          .common-container {
            padding: 20px 8px 16px 8px;
            max-width: 98vw;
          }
        }
      `}</style>
      <div className="common-container">
        <h2>Welcome !</h2>
        <h1 className="signup-title">Sign up to</h1>
        <div className="subtitle">Lorem Ipsum is simply</div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          />
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
          <PasswordInput
            label="Confirm Password"
            value={confirm}
            onChange={handleConfirmChange}
            placeholder="Confirm your Password"
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? '처리 중...' : 'Register'}
          </button>
        </form>
        <div className="login-link">
          Already have an Account?{' '}
          <span
            className="register-link"
            onClick={() => navigate('/login')}
            tabIndex={0}
            role="button"
          >
            <b>Login</b>
          </span>
        </div>
      </div>
    </>
  );
};

export default SignupPage;

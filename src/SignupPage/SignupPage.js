import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../Input/FormInput';
import PasswordInput from '../Input/PasswordInput';
import '../styles/CommonPage.css';
import './Signup.css';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function validateEmail(email) {
    // . 뒤에 2글자 이상
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (e) => {
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
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="common-container">
      <h2>Welcome !</h2>
      <h1 className="signup-title">Sign up to</h1>
      <div className="subtitle">Lorem Ipsum is simply</div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
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
        <PasswordInput
          label="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
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
  );
}

export default SignupPage;

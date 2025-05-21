import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../Input/FormInput';
import '../styles/CommonPage.css';
import './ForgotPasswordPage.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    // 실제 비밀번호 찾기 API 연동 부분 (아래는 데모)
    setTimeout(() => {
      setMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="common-container">
      <h2>Welcome !</h2>
      <h1>Reset Password</h1>
      <form className="forgot-form" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        {message && (
          <div className="success-message">{message}</div>
        )}
        <button
          type="submit"
          className="login-btn"
          disabled={isLoading}
        >
          {isLoading ? '처리 중...' : 'Send Reset Link'}
        </button> 
      </form>
      <div className="forgot-link" style={{ marginTop: '2.1em', textAlign: 'center', color: '#888', fontSize: '1em' }}>
        Remember your password?
        <span
          className="register-link"
          onClick={() => navigate('/login')}
          tabIndex={0}
          role="button"
          style={{ color: '#111', fontWeight: 'bold', marginLeft: 6, cursor: 'pointer' }}
        >
          login
        </span>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../Input/FormInput';
import PasswordInput from '../Input/PasswordInput';
import '../styles/SignupForm.css';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@][^\s@]{1,}$/;
      return emailRegex.test(email);
    }
    if(!validateEmail(email)){
      setError('이메일 형식이 잘못되었습니다.')
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
        {type:"application/json"}
      )
    );

    try {
      setIsLoading(true);
      const response = await fetch('http://52.78.159.151:8080/api/members/signup', { //server 주소소
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        switch(result.statusMessage){
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
      navigate('/signupsuccess')
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
}

export default SignupForm;

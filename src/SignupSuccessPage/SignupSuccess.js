import React from 'react';
import '../styles/CommonPage.css';

function SignupSuccess() {
  return (
    <div className="common-container">
    <h2 >Welcome !</h2>
    <h1 >Sign up Success</h1>
    <div className="subtitle">회원가입이 완료되었습니다.</div>
    <div style={{ margin: "32px 0" }}>
        <span style={{ fontSize: "1.1em", color: "#111" }}>
        이제 로그인하여 서비스를 이용해보세요!
        </span>
    </div>
    <a href="/login" className="login-btn" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
        Login
    </a>
    </div>
  );
}

export default SignupSuccess;

import React, { useState } from 'react';
import './Input.css';
function PasswordInput({ label, value, onChange, placeholder, ...props }) {
  const [show, setShow] = useState(false);

  return (
    <div className="form-group">
      <label>
        {label}
        <div className="input-wrapper">
          <input
            type={show ? "text" : "password"}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            {...props}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShow((v) => !v)}
            tabIndex={-1}
            aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {show ? '🙈' : '👁️'}
          </button>
        </div>
      </label>
    </div>
  );
}

export default PasswordInput;

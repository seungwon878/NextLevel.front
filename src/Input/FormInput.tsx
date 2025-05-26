import React from 'react';
import './Input.css';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <div className="form-group">
      <label>
        {label}
        <div className="input-wrapper">
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...props}
          />
        </div>
      </label>
    </div>
  );
};

export default FormInput;

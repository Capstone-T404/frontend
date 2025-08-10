import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './TextInput.css';

const TextInput = ({
                       label,
                       size = 'md',
                       type = 'text',
                       fullWidth = true,
                       error = false,
                       errorMessage = '',
                       value,
                       onChange,
                       placeholder,
                       name,
                       id,
                       required = false,
                       disabled = false,
                       autoComplete,
                       className = '',
                       ...props
                   }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const containerClasses = [
        'text-input-container',
        fullWidth && 'text-input-container--full-width',
        className
    ].filter(Boolean).join(' ');

    const inputClasses = [
        'text-input',
        `text-input--${size}`,
        error && 'text-input--error',
        isPassword && 'text-input--password'
    ].filter(Boolean).join(' ');

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={containerClasses}>
            {label && (
                <label htmlFor={id} className="text-input__label">
                    {label}
                    {required && <span className="text-input__required">*</span>}
                </label>
            )}
            <div className="text-input__wrapper">
                <input
                    type={inputType}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    className={inputClasses}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="text-input__toggle"
                        onClick={handleTogglePassword}
                        tabIndex={-1}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
            {error && errorMessage && (
                <span className="text-input__error-message">{errorMessage}</span>
            )}
        </div>
    );
};

export default TextInput;
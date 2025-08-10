import React from 'react';
import './Button.css';

const Button = ({
                    children,
                    size = 'md',
                    variant = 'primary',
                    fullWidth = false,
                    disabled = false,
                    loading = false,
                    onClick,
                    type = 'button',
                    className = '',
                    ...props
                }) => {
    const classNames = [
        'button',
        `button--${size}`,
        `button--${variant}`,
        fullWidth && 'button--full-width',
        disabled && 'button--disabled',
        loading && 'button--loading',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={classNames}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading ? <span className="button__loader">Loading...</span> : children}
        </button>
    );
};

export default Button;
import React from 'react';
import './SuccessMessage.css';

const SuccessMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className="success-message">
            <span>✅ {message}</span>
        </div>
    );
};

export default SuccessMessage;
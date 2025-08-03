import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import TextInput from '../../components/UI/TextInput/TextInput';
import RedsLogo from '../../assets/reds-logo.png';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Handle password reset
        console.log('Sending reset code to:', email);
        setTimeout(() => setIsLoading(false), 2000);
    };

    const handleBackToSignIn = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-page__left">
                <div className="forgot-password-form">
                    <h1 className="forgot-password-form__title">Forgot Password</h1>
                    <p className="forgot-password-form__subtitle">
                        Reset your password
                    </p>

                    <form onSubmit={handleSubmit} className="forgot-password-form__form">
                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            size="lg"
                            fullWidth
                        />

                        <p className="forgot-password-form__info">
                            We'll send a code to your email address to reset your password.
                        </p>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={isLoading}
                        >
                            Send Reset Code
                        </Button>
                    </form>

                    <div className="forgot-password-form__footer">
                        <a href="/login" onClick={handleBackToSignIn} className="forgot-password-form__link">
                            Back to sign in
                        </a>
                    </div>
                </div>
            </div>

            <div className="forgot-password-page__right">
                <div className="forgot-password-page__logo-container">
                    <img src={RedsLogo} alt="Reds Logo" className="forgot-password-page__logo"/>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
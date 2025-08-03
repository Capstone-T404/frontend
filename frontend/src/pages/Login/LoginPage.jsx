import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import TextInput from '../../components/UI/TextInput/TextInput';
import RedsLogo from '../../assets/reds-logo.png';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Handle form submission
        console.log('Signing in with:', email);
        setTimeout(() => setIsLoading(false), 2000);
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    return (
        <div className="login-page">
            <div className="login-page__left">
                <div className="login-form">
                    <h1 className="login-form__title">Welcome!</h1>
                    <p className="login-form__subtitle">
                        Login to your account
                    </p>

                    <form onSubmit={handleSubmit} className="login-form__form">
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

                        <TextInput
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            size="lg"
                            fullWidth
                            autoComplete="current-password"
                        />

                        <div className="login-form__forgot-password">
                            <button type="button" onClick={handleForgotPassword} className="login-form__link login-form__link--button">
                                Forgot password?
                            </button>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={isLoading}
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="login-form__footer">
                        <p>
                            Don't have an account?{' '}
                            <a href="/signup" className="login-form__link">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="login-page__right">
                <div className="login-page__logo-container">
                    <img src={RedsLogo} alt="Reds Logo" className="login-page__logo" />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
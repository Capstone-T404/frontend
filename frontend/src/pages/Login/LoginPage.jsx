import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth/AuthContext';
import Button from '../../components/UI/Button/Button';
import TextInput from '../../components/UI/TextInput/TextInput';
import ErrorMessage from '../../components/UI/Message/ErrorMessage/ErrorMessage';
import { signIn } from '../../services/Auth/CognitoService';
import RedsLogo from '../../assets/reds-logo.png';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { setUser } = useAuth(); // Get setUser from context
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn(email, password);
            console.log('Sign in successful:', result);

            // Update the auth context with user info
            setUser({
                username: email,
                session: result
            });

            // Redirect to dashboard on success
            navigate('/dashboard');
        } catch (err) {
            console.error('Sign in error:', err);

            // Handle different error types
            let errorMessage = 'Sign in failed. Please try again.';

            if (err.code === 'UserNotConfirmedException') {
                errorMessage = 'Please verify your email address before signing in.';
            } else if (err.code === 'NotAuthorizedException') {
                errorMessage = 'Incorrect email or password.';
            } else if (err.code === 'UserNotFoundException') {
                errorMessage = 'No account found with this email address.';
            }

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
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

                    <ErrorMessage message={error} />

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
                            disabled={isLoading}
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
                            disabled={isLoading}
                        />

                        <div className="login-form__forgot-password">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="login-form__link login-form__link--button"
                                disabled={isLoading}
                            >
                                Forgot password?
                            </button>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="login-form__footer">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/signup" className="login-form__link">
                                Sign up
                            </Link>
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
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth/AuthContext';
import Button from '../../components/UI/Button/Button';
import TextInput from '../../components/UI/TextInput/TextInput';
import ErrorMessage from '../../components/UI/Message/ErrorMessage/ErrorMessage';
import SuccessMessage from '../../components/UI/Message/SuccessMessage/SuccessMessage';
import RedsLogo from '../../assets/reds-logo.png';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
    const [step, setStep] = useState('request'); // 'request' or 'reset'
    const [formData, setFormData] = useState({
        email: '',
        verificationCode: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { forgotPassword, confirmPassword, error, clearError } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear errors when user starts typing
        if (error || formError) {
            clearError();
            setFormError('');
        }
        setSuccessMessage('');
    };

    const validateEmailStep = () => {
        if (!formData.email.trim()) {
            setFormError('Email is required');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormError('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const validateResetStep = () => {
        if (!formData.verificationCode.trim()) {
            setFormError('Verification code is required');
            return false;
        }

        if (!formData.newPassword.trim()) {
            setFormError('New password is required');
            return false;
        }

        if (!formData.confirmPassword.trim()) {
            setFormError('Please confirm your new password');
            return false;
        }

        // Password validation
        if (formData.newPassword.length < 8) {
            setFormError('Password must be at least 8 characters long');
            return false;
        }

        // Password complexity
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
        if (!passwordRegex.test(formData.newPassword)) {
            setFormError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
            return false;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setFormError('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleRequestReset = async (e) => {
        e.preventDefault();

        if (!validateEmailStep()) {
            return;
        }

        setIsLoading(true);
        setFormError('');
        setSuccessMessage('');

        try {
            await forgotPassword(formData.email);
            setStep('reset');
            setSuccessMessage('Reset code sent to your email address');
        } catch (err) {
            console.error('Password reset request error:', err);

            switch (err.code) {
                case 'UserNotFoundException':
                    setFormError('No account found with this email address');
                    break;
                case 'InvalidParameterException':
                    setFormError('Invalid email format');
                    break;
                case 'TooManyRequestsException':
                    setFormError('Too many requests. Please try again later');
                    break;
                case 'LimitExceededException':
                    setFormError('Reset limit exceeded. Please try again later');
                    break;
                default:
                    setFormError(err.message || 'Failed to send reset code. Please try again');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmReset = async (e) => {
        e.preventDefault();

        if (!validateResetStep()) {
            return;
        }

        setIsLoading(true);
        setFormError('');
        setSuccessMessage('');

        try {
            await confirmPassword(
                formData.email,
                formData.verificationCode,
                formData.newPassword
            );

            setSuccessMessage('Password reset successfully! Redirecting to login...');

            // Redirect to login after a short delay
            setTimeout(() => {
                navigate('/login', {
                    state: {
                        message: 'Password reset successfully. You can now sign in with your new password.'
                    }
                });
            }, 2000);

        } catch (err) {
            console.error('Password reset confirmation error:', err);

            switch (err.code) {
                case 'CodeMismatchException':
                    setFormError('Invalid verification code');
                    break;
                case 'ExpiredCodeException':
                    setFormError('Verification code has expired. Please request a new one');
                    setStep('request');
                    break;
                case 'InvalidPasswordException':
                    setFormError('Password does not meet requirements');
                    break;
                case 'TooManyFailedAttemptsException':
                    setFormError('Too many failed attempts. Please try again later');
                    break;
                default:
                    setFormError(err.message || 'Password reset failed. Please try again');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToRequest = () => {
        setStep('request');
        setFormData(prev => ({
            ...prev,
            verificationCode: '',
            newPassword: '',
            confirmPassword: ''
        }));
        setFormError('');
        setSuccessMessage('');
    };

    const displayError = formError || error;

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-page__left">
                <div className="forgot-password-form">
                    <h1 className="forgot-password-form__title">
                        {step === 'request' ? 'Forgot Password' : 'Reset Password'}
                    </h1>
                    <p className="forgot-password-form__subtitle">
                        {step === 'request'
                            ? 'Enter your email to receive a reset code'
                            : 'Enter the code sent to your email and your new password'
                        }
                    </p>

                    {displayError && (
                        <ErrorMessage message={displayError} />
                    )}

                    {successMessage && (
                        <SuccessMessage message={successMessage} />
                    )}

                    {step === 'request' ? (
                        <form onSubmit={handleRequestReset} className="forgot-password-form__form">
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                label="Email"
                                placeholder="Your email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                size="lg"
                                fullWidth
                                autoComplete="email"
                                disabled={isLoading}
                            />

                            <p className="forgot-password-form__info">
                                We'll send a verification code to your email address to reset your password.
                            </p>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                Send Reset Code
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleConfirmReset} className="forgot-password-form__form">
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                label="Email"
                                value={formData.email}
                                disabled
                                size="lg"
                                fullWidth
                            />

                            <TextInput
                                id="verificationCode"
                                name="verificationCode"
                                type="text"
                                label="Verification Code"
                                placeholder="Enter the 6-digit code"
                                value={formData.verificationCode}
                                onChange={handleChange}
                                required
                                size="lg"
                                fullWidth
                                disabled={isLoading}
                                maxLength={6}
                            />

                            <TextInput
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                label="New Password"
                                placeholder="Enter your new password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                                size="lg"
                                fullWidth
                                autoComplete="new-password"
                                disabled={isLoading}
                            />

                            <TextInput
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                label="Confirm New Password"
                                placeholder="Confirm your new password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                size="lg"
                                fullWidth
                                autoComplete="new-password"
                                disabled={isLoading}
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                Reset Password
                            </Button>

                            <div className="forgot-password-form__back-button">
                                <button
                                    type="button"
                                    onClick={handleBackToRequest}
                                    className="forgot-password-form__link forgot-password-form__link--button"
                                    disabled={isLoading}
                                >
                                    Back to email step
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="forgot-password-form__footer">
                        <Link to="/login" className="forgot-password-form__link">
                            Back to sign in
                        </Link>
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
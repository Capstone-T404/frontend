import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth/AuthContext';
import Button from '../../components/UI/Button/Button';
import TextInput from '../../components/UI/TextInput/TextInput';
import ErrorMessage from '../../components/UI/Message/ErrorMessage/ErrorMessage';
import SuccessMessage from '../../components/UI/Message/SuccessMessage/SuccessMessage';
import RedsLogo from '../../assets/reds-logo.png';
import './EmailVerificationPage.css';

const VerifyEmailPage = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [formError, setFormError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [canResend, setCanResend] = useState(true);
    const [countdown, setCountdown] = useState(0);

    const { confirmSignUp, resendCode, error, clearError } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || '';
    const initialMessage = location.state?.message || '';

    useEffect(() => {
        if (initialMessage) {
            setSuccessMessage(initialMessage);
        }

        if (!email) {
            // Redirect to signup if no email provided
            navigate('/signup');
        }
    }, [email, initialMessage, navigate]);

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else {
            setCanResend(true);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Only allow digits
        if (value.length <= 6) {
            setVerificationCode(value);
        }

        // Clear errors when user starts typing
        if (error || formError) {
            clearError();
            setFormError('');
        }
        setSuccessMessage('');
    };

    const validateForm = () => {
        if (!verificationCode.trim()) {
            setFormError('Verification code is required');
            return false;
        }

        if (verificationCode.length !== 6) {
            setFormError('Please enter the complete 6-digit code');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setFormError('');
        setSuccessMessage('');

        try {
            await confirmSignUp(email, verificationCode);

            setSuccessMessage('Email verified successfully! Redirecting to login...');

            // Redirect to login after a short delay
            setTimeout(() => {
                navigate('/login', {
                    state: {
                        message: 'Email verified successfully! You can now sign in to your account.'
                    }
                });
            }, 2000);

        } catch (err) {
            console.error('Email verification error:', err);

            switch (err.code) {
                case 'CodeMismatchException':
                    setFormError('Invalid verification code');
                    break;
                case 'ExpiredCodeException':
                    setFormError('Verification code has expired. Please request a new one');
                    break;
                case 'NotAuthorizedException':
                    setFormError('User is already confirmed');
                    navigate('/login');
                    break;
                case 'TooManyFailedAttemptsException':
                    setFormError('Too many failed attempts. Please try again later');
                    break;
                default:
                    setFormError(err.message || 'Verification failed. Please try again');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!canResend) return;

        setIsResending(true);
        setFormError('');
        setSuccessMessage('');

        try {
            await resendCode(email);
            setSuccessMessage('Verification code sent successfully!');
            setCanResend(false);
            setCountdown(60); // 60-second cooldown
        } catch (err) {
            console.error('Resend code error:', err);

            switch (err.code) {
                case 'TooManyRequestsException':
                    setFormError('Too many requests. Please wait before trying again');
                    setCanResend(false);
                    setCountdown(300); // 5-minute cooldown for rate limiting
                    break;
                case 'InvalidParameterException':
                    setFormError('Invalid email format');
                    break;
                default:
                    setFormError(err.message || 'Failed to resend code. Please try again');
            }
        } finally {
            setIsResending(false);
        }
    };

    const displayError = formError || error;

    if (!email) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="verify-email-page">
            <div className="verify-email-page__left">
                <div className="verify-email-form">
                    <h1 className="verify-email-form__title">Verify Your Email</h1>
                    <p className="verify-email-form__subtitle">
                        We've sent a 6-digit verification code to:
                    </p>
                    <p className="verify-email-form__email">{email}</p>

                    {displayError && (
                        <ErrorMessage message={displayError} />
                    )}

                    {successMessage && (
                        <SuccessMessage message={successMessage} />
                    )}

                    <form onSubmit={handleSubmit} className="verify-email-form__form">
                        <TextInput
                            id="verificationCode"
                            name="verificationCode"
                            type="text"
                            label="Verification Code"
                            placeholder="Enter 6-digit code"
                            value={verificationCode}
                            onChange={handleChange}
                            required
                            size="lg"
                            fullWidth
                            disabled={isLoading}
                            maxLength={6}
                            pattern="[0-9]{6}"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={isLoading}
                            disabled={isLoading || verificationCode.length !== 6}
                        >
                            Verify Email
                        </Button>
                    </form>

                    <div className="verify-email-form__resend">
                        <p>Didn't receive the code?</p>
                        <button
                            type="button"
                            onClick={handleResendCode}
                            className="verify-email-form__link verify-email-form__link--button"
                            disabled={!canResend || isResending}
                        >
                            {isResending
                                ? 'Sending...'
                                : canResend
                                    ? 'Resend code'
                                    : `Resend in ${countdown}s`
                            }
                        </button>
                    </div>

                    <div className="verify-email-form__footer">
                        <p>
                            Need to use a different email?{' '}
                            <Link to="/signup" className="verify-email-form__link">
                                Create new account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="verify-email-page__right">
                <div className="verify-email-page__logo-container">
                    <img src={RedsLogo} alt="Reds Logo" className="verify-email-page__logo"/>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth/AuthContext';
import Button from '../../components/UI/Button/Button';
import TextInput from '../../components/UI/TextInput/TextInput';
import ErrorMessage from '../../components/UI/Message/ErrorMessage/ErrorMessage';
import RedsLogo from '../../assets/reds-logo.png';
import './CreateAccountPage.css';

const CreateAccountPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState('');

    const { signUp, error, clearError } = useAuth();
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
    };

    const validateForm = () => {
        // Check required fields
        if (!formData.firstName.trim()) {
            setFormError('First name is required');
            return false;
        }

        if (!formData.lastName.trim()) {
            setFormError('Last name is required');
            return false;
        }

        if (!formData.email.trim()) {
            setFormError('Email is required');
            return false;
        }

        if (!formData.password.trim()) {
            setFormError('Password is required');
            return false;
        }

        if (!formData.confirmPassword.trim()) {
            setFormError('Please confirm your password');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormError('Please enter a valid email address');
            return false;
        }

        // Password validation
        if (formData.password.length < 8) {
            setFormError('Password must be at least 8 characters long');
            return false;
        }

        // Password complexity
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
        if (!passwordRegex.test(formData.password)) {
            setFormError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
            return false;
        }

        // Confirm password match
        if (formData.password !== formData.confirmPassword) {
            setFormError('Passwords do not match');
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

        try {
            await signUp(
                formData.email,
                formData.password,
                formData.firstName,
                formData.lastName
            );

            // Success - redirect to email verification page
            navigate('/verify-email', {
                state: {
                    email: formData.email,
                    message: 'Account created successfully! Please check your email for a verification code.'
                }
            });

        } catch (err) {
            console.error('Sign up error:', err);

            // Handle specific Cognito errors
            switch (err.code) {
                case 'UsernameExistsException':
                    setFormError('An account with this email already exists');
                    break;
                case 'InvalidPasswordException':
                    setFormError('Password does not meet requirements');
                    break;
                case 'InvalidParameterException':
                    setFormError('Invalid email format');
                    break;
                case 'TooManyRequestsException':
                    setFormError('Too many requests. Please try again later');
                    break;
                default:
                    setFormError(err.message || 'Account creation failed. Please try again');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const displayError = formError || error;

    return (
        <div className="create-account-page">
            <div className="create-account-page__left">
                <div className="create-account-form">
                    <h1 className="create-account-form__title">Create Account</h1>
                    <p className="create-account-form__subtitle">
                        Join the QLD Reds app
                    </p>

                    {displayError && (
                        <ErrorMessage message={displayError} />
                    )}

                    <form onSubmit={handleSubmit} className="create-account-form__form">
                        <div className="create-account-form__name-row">
                            <TextInput
                                id="firstName"
                                name="firstName"
                                type="text"
                                label="First Name"
                                placeholder="First name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                size="lg"
                                fullWidth
                                disabled={isLoading}
                            />
                            <TextInput
                                id="lastName"
                                name="lastName"
                                type="text"
                                label="Last Name"
                                placeholder="Last name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                size="lg"
                                fullWidth
                                disabled={isLoading}
                            />
                        </div>

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

                        <TextInput
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="Create a password"
                            value={formData.password}
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
                            label="Confirm Password"
                            placeholder="Confirm your password"
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
                            Create Account
                        </Button>
                    </form>

                    <div className="create-account-form__footer">
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="create-account-form__link">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="create-account-page__right">
                <div className="create-account-page__logo-container">
                    <img src={RedsLogo} alt="Reds Logo" className="create-account-page__logo"/>
                </div>
            </div>
        </div>
    );
};

export default CreateAccountPage;
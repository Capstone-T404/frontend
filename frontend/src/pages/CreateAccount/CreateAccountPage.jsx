import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import TextInput from '../../components/UI/TextInput/TextInput';
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
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Handle account creation
        console.log('Creating account:', formData);
        setTimeout(() => setIsLoading(false), 2000);
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="create-account-page">
            <div className="create-account-page__left">
                <div className="create-account-form">
                    <h1 className="create-account-form__title">Create Account</h1>
                    <p className="create-account-form__subtitle">
                        Join the QLD Reds app
                    </p>

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
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            loading={isLoading}
                        >
                            Create Account
                        </Button>
                    </form>

                    <div className="create-account-form__footer">
                        <p>
                            Already have an account?{' '}
                            <a href="/login" onClick={handleSignIn} className="create-account-form__link">
                                Sign in
                            </a>
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
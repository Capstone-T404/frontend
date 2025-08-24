import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    getCurrentUser,
    signOut as cognitoSignOut,
    signUp as cognitoSignUp,
    forgotPassword as cognitoForgotPassword,
    confirmPassword as cognitoConfirmPassword,
    confirmRegistration,
    resendConfirmationCode
} from '../../services/Auth/CognitoService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuthState();
    }, []);

    const checkAuthState = async () => {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        } catch (err) {
            console.log('No authenticated user');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (email, password, firstName, lastName) => {
        try {
            setError(null);
            const result = await cognitoSignUp(email, password, firstName, lastName);
            return result;
        } catch (err) {
            setError(err.message || 'Sign up failed');
            throw err;
        }
    };

    const confirmSignUp = async (email, verificationCode) => {
        try {
            setError(null);
            const result = await confirmRegistration(email, verificationCode);
            return result;
        } catch (err) {
            setError(err.message || 'Confirmation failed');
            throw err;
        }
    };

    const forgotPassword = async (email) => {
        try {
            setError(null);
            const result = await cognitoForgotPassword(email);
            return result;
        } catch (err) {
            setError(err.message || 'Password reset request failed');
            throw err;
        }
    };

    const confirmPassword = async (email, verificationCode, newPassword) => {
        try {
            setError(null);
            const result = await cognitoConfirmPassword(email, verificationCode, newPassword);
            return result;
        } catch (err) {
            setError(err.message || 'Password reset failed');
            throw err;
        }
    };

    const signOut = () => {
        cognitoSignOut();
        setUser(null);
        setError(null);
    };

    const resendCode = async (email) => {
        try {
            setError(null);
            const result = await resendConfirmationCode(email);
            return result;
        } catch (err) {
            setError(err.message || 'Resend code failed');
            throw err;
        }
    };

    const clearError = () => setError(null);

    const value = {
        user,
        loading,
        error,
        signUp,
        confirmSignUp,
        forgotPassword,
        confirmPassword,
        resendCode,
        signOut,
        clearError,
        isAuthenticated: !!user,
        setUser, // For updating user after successful login
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/Auth/AuthContext";
import LoginPage from "./pages/Login/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";
import CreateAccountPage from "./pages/CreateAccount/CreateAccountPage";
import VerifyEmailPage from "./pages/EmailVerification/EmailVerificationPage";
import Dashboard from "./pages/Dashboard/Dashboard";

function AppContent() {
    const { isAuthenticated, loading } = useAuth();

    // Show loading while checking authentication status
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column'
            }}>
                <h2>Loading...</h2>
                <p>Checking authentication status...</p>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* Redirect root based on auth status */}
                <Route
                    path="/"
                    element={
                        <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
                    }
                />

                {/* Auth pages - redirect to dashboard if already logged in */}
                <Route
                    path="/login"
                    element={
                        isAuthenticated ?
                            <Navigate to="/dashboard" replace /> :
                            <LoginPage />
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        isAuthenticated ?
                            <Navigate to="/dashboard" replace /> :
                            <ForgotPasswordPage />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        isAuthenticated ?
                            <Navigate to="/dashboard" replace /> :
                            <CreateAccountPage />
                    }
                />

                {/* Add the verify-email route */}
                <Route
                    path="/verify-email"
                    element={<VerifyEmailPage />}
                />

                {/* Protected routes */}
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ?
                            <Dashboard /> :
                            <Navigate to="/login" replace />
                    }
                />

                {/* Catch-all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
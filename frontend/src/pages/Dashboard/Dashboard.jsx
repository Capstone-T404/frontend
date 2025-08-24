import React from 'react';
import { useAuth } from '../../context/Auth/AuthContext';
import Button from '../../components/UI/Button/Button';
import './Dashboard.css';

const Dashboard = () => {
    const { user, signOut } = useAuth();

    const handleSignOut = () => {
        signOut();
    };

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <h1>Welcome to QLD Reds Dashboard</h1>
                <Button
                    variant="secondary"
                    onClick={handleSignOut}
                >
                    Sign Out
                </Button>
            </div>

            <div className="dashboard__content">
                <div className="dashboard__user-info">
                    <h2>Your Profile</h2>
                    <div className="user-details">
                        <p><strong>Username:</strong> {user?.username || 'Not available'}</p>
                        <p><strong>Session:</strong> Active</p>
                    </div>
                </div>

                <div className="dashboard__welcome">
                    <h3>Welcome back!</h3>
                    <p>You have successfully signed in to your QLD Reds account.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
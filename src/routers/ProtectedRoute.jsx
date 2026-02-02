import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from "../context/AuthProvider";
import StatusModal from '../components/modal/StatusModal';

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            setIsModalOpen(true);
        }
    }, [user, isLoading]);

    const handleLoginRedirect = () => {
        setIsModalOpen(false);
        navigate("/login", { state: { from: location }, replace: true });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006C76]"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <StatusModal
                isOpen={isModalOpen}
                onClose={handleLoginRedirect}
                title="Authentication Required"
                message="Please login to access this page."
                type="warning"
                actionLabel="Login Now"
                onAction={handleLoginRedirect}
            />
        );
    }

    // Check for Admin Role
    if (user.role !== 'ADMIN') {
        return (
            <StatusModal
                isOpen={true}
                onClose={handleLoginRedirect}
                title="Access Denied"
                message="You do not have permission to access this page. Admin privileges required."
                type="error"
                actionLabel="Go Back"
                onAction={handleLoginRedirect}
            />
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;

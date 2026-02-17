import api from './api';

const adminService = {
    //
    getDashboardOverview: () => api.get('/admin/overview'),
    getUserOverview: () => api.get('/admin/user-overview'),
    getRecentUsers: () => api.get('/admin/recent-users'),

    // User Management
    getAllUsers: (params) => api.get('/admin/users', { params }),
    getCustomers: (params) => api.get('/admin/users/customers', { params }),
    getProviders: (params) => api.get('/admin/users/providers', { params }),
    getReportedUsers: (params) => api.get('/admin/users/reported', { params }),
    getBlockedUsers: (params) => api.get('/admin/users/blocked', { params }),

    // User Actions
    blockUser: (userId, data) => api.patch(`/admin/users/${userId}/block`, data),
    unblockUser: (userId) => api.patch(`/admin/users/${userId}/unblock`),

    // Notifications
    sendBroadcast: (data) => api.post('/admin/notifications', data),
    sendDirectNotification: (userId, role, data) => {
        // Determine endpoint based on role (case-insensitive)
        const normalizedRole = role?.toUpperCase();
        if (normalizedRole === 'CUSTOMER') {
            return api.post('/api/v1/admin/customer/notifications', { ...data, userId });
        } else if (normalizedRole === 'PROVIDER') {
            return api.post('/api/v1/admin/provider/notifications', { ...data, userId });
        } else {
            // Fallback or error if needed, but for now assuming valid role
            throw new Error(`Invalid role for direct notification: ${role}`);
        }
    },

    // Profile & Settings
    getProfile: () => api.get('/admin/profile'),
    updateProfile: (data) => api.put('/admin/profile', data),
    changePassword: (data) => api.patch('/api/v1/admin/change-password', data),
};

export default adminService;

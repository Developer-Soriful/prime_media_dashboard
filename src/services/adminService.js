import api from './api';

const adminService = {
    // Dashboard Analytics
    getDashboardOverview: () => api.get('/api/admin/dashboard/overview'),
    getUserOverview: () => api.get('/api/admin/dashboard/user-overview'),
    getRecentUsers: () => api.get('/api/admin/dashboard/recent-users'),

    // User Management
    getAllUsers: (params) => api.get('/api/admin/users', { params }),
    getCustomers: (params) => api.get('/api/admin/users/customers', { params }),
    getProviders: (params) => api.get('/api/admin/users/providers', { params }),
    getReportedUsers: (params) => api.get('/api/admin/users/reported', { params }),
    getBlockedUsers: (params) => api.get('/api/admin/users/blocked', { params }),

    // User Actions
    blockUser: (userId, data) => api.patch(`/api/admin/users/${userId}/block`, data),
    unblockUser: (userId) => api.patch(`/api/admin/users/${userId}/unblock`),

    // Notifications
    sendBroadcast: (data) => api.post('/api/v1/admin/notifications', data),
    sendDirectNotification: (userId, role, data) => {
        // Determine endpoint based on role (case-insensitive)
        const normalizedRole = role?.toUpperCase();
        if (normalizedRole === 'CUSTOMER') {
            return api.post('/api/v1/admin/customer/notifications', { ...data, userId });
        } else if (normalizedRole === 'PROVIDER') {
            return api.post('/api/v1/admin/provider/notifications', { ...data, userId });
        } else {
            throw new Error(`Invalid role for direct notification: ${role}`);
        }
    },

    // Profile & Settings
    getProfile: () => api.get('/api/admin/profile'),
    updateProfile: (data) => api.put('/api/admin/profile', data),
    changePassword: (data) => api.patch('/api/v1/admin/change-password', data),
};

export default adminService;

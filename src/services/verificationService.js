import api from './api';

/**
 * Service for managing provider verification requests (Admin side)
 */
const verificationService = {
    /**
     * Get a list of pending verification requests
     * @param {number} page 
     * @param {number} limit 
     * @returns {Promise}
     */
    getPending: (page = 1, limit = 10) =>
        api.get(`/api/admin/verifications?page=${page}&limit=${limit}`),

    /**
     * Get full details of a specific verification request
     * @param {string} providerUserId 
     * @returns {Promise}
     */
    getDetails: (providerUserId) =>
        api.get(`/api/admin/verifications/${providerUserId}`),

    /**
     * Approve a provider's verification
     * @param {string} providerUserId 
     * @returns {Promise}
     */
    approve: (providerUserId) =>
        api.patch(`/api/admin/verifications/${providerUserId}/approve`),

    /**
     * Reject a provider's verification with a reason
     * @param {string} providerUserId 
     * @param {string} reason 
     * @returns {Promise}
     */
    reject: (providerUserId, reason) =>
        api.patch(`/api/admin/verifications/${providerUserId}/reject`, { reason }),
};

export default verificationService;

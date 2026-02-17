import api from './api';

// ─────────────────────────────────────────────
// Media Service — CRUD operations for /api/media
// ─────────────────────────────────────────────

const mediaService = {
    /**
     * Create a single media item.
     * @param {{ type: string, url: string, title: string, description?: string, category?: string, location?: string, thumbnailUrl?: string, duration?: number, width?: number, height?: number, fileSize?: number }} data
     */
    create: (data) => api.post('/api/media', data),

    /**
     * Create multiple media items in a single request (max 50).
     * @param {Array} media — array of media objects
     */
    createBulk: (media) => api.post('/api/media', { media }),

    /**
     * Get a single media item by ID.
     * @param {string} mediaId
     */
    getById: (mediaId) => api.get(`/api/media/${mediaId}`),

    /**
     * Update a media item (partial update).
     * @param {string} mediaId
     * @param {Object} data — fields to update
     */
    update: (mediaId, data) => api.patch(`/api/media/${mediaId}`, data),

    /**
     * Soft-delete a media item.
     * @param {string} mediaId
     */
    delete: (mediaId) => api.delete(`/api/media/${mediaId}`),
};

export default mediaService;

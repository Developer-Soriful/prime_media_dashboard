import api from './api';

const categoryService = {
    // Get all categories
    getAll: () => api.get('/api/categories'),

    // Get single category
    getById: (id) => api.get(`/api/categories/${id}`),

    // Create new category
    create: (data) => api.post('/api/categories', data),

    // Update category
    update: (id, data) => api.put(`/api/categories/${id}`, data),

    // Delete category
    delete: (id) => api.delete(`/api/categories/${id}`),
};

export default categoryService;

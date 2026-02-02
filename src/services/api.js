import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_PRODUCTION_API_BASE_URL

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

// Request interceptor - Add token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor - DO NOT return response.data here!
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
        }
        return Promise.reject(error);
    }
);

// Helper methods - return only .data
export const get = (url, config = {}) =>
    api.get(url, config).then((res) => res.data);

export const post = (url, data, config = {}) =>
    api.post(url, data, config).then((res) => res.data);

export const put = (url, data, config = {}) =>
    api.put(url, data, config).then((res) => res.data);

export const patch = (url, data, config = {}) =>
    api.patch(url, data, config).then((res) => res.data);

export const del = (url, config = {}) =>
    api.delete(url, config).then((res) => res.data);

// Helper to fetch image via proxy to avoid CORS issues
// export const getImageUrl = (relativePath) => {
//     // Proxy through your backend so the browser sees same-origin
//     return `${API_BASE_URL.replace('/api', '')}/proxy-image?path=${encodeURIComponent(relativePath)}`;
// };

export default {
    get,
    post,
    put,
    patch,
    delete: del,
    // You can also expose the axios instance if needed
    axios: api,
};
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        // Don't attach token for auth endpoints to avoid 401s from invalid tokens
        const isAuthEndpoint = config.url?.includes('auth/login') || config.url?.includes('auth/registration');

        if (token && !isAuthEndpoint) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh (optional for MVP but good practice)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle 401 Unauthorized here if needed (e.g., redirect to login)
        return Promise.reject(error);
    }
);

export default api;

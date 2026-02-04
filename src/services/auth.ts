import api from './api';

export interface AuthResponse {
    access: string;
    refresh: string;
    user?: any;
    key?: string; // For dj-rest-auth sometimes
}

export const authService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await api.post('auth/login/', { email, password });
        if (response.data.access) {
            localStorage.setItem('access_token', response.data.access);
            if (chrome?.storage?.sync) chrome.storage.sync.set({ access_token: response.data.access });
            if (response.data.refresh) {
                localStorage.setItem('refresh_token', response.data.refresh);
            }
        } else if (response.data.key) {
            // Fallback for default dj-rest-auth without JWT if misconfigured, though we set JWT=True
            localStorage.setItem('access_token', response.data.key);
        }
        return response.data;
    },

    async register(email: string, password: string, passwordConfirm: string, username: string): Promise<AuthResponse> {
        const response = await api.post('auth/registration/', {
            username,
            email,
            password1: password,
            password2: passwordConfirm,
        });
        // Check key or access token
        if (response.data.access) {
            localStorage.setItem('access_token', response.data.access);
        } else if (response.data.key) {
            localStorage.setItem('access_token', response.data.key);
        }
        return response.data;
    },

    async loginWithGithub(code: string): Promise<AuthResponse> {
        const response = await api.post('auth/github/', { code });
        if (response.data.access || response.data.key) {
            localStorage.setItem('access_token', response.data.access || response.data.key);
        }
        return response.data;
    },

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // Optional: Call logout endpoint logic
        // api.post('auth/logout/')
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    }
};

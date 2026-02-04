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
        const token = response.data.access || response.data.key;
        if (token) {
            localStorage.setItem('access_token', token);
            if (chrome?.storage?.sync) chrome.storage.sync.set({ access_token: token });
        }
        return response.data;
    },

    async loginWithGithub(code: string): Promise<AuthResponse> {
        const response = await api.post('auth/github/', { code });
        const token = response.data.access || response.data.key;
        if (token) {
            localStorage.setItem('access_token', token);
            if (chrome?.storage?.sync) chrome.storage.sync.set({ access_token: token });
        }
        return response.data;
    },

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        if (chrome?.storage?.sync) chrome.storage.sync.remove('access_token');
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    }
};

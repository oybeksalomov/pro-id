import axios from 'axios';

export const unauthorizedClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL + '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authorizedClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL + '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

authorizedClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

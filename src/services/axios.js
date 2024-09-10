import axios from 'axios'

export const unauthorizedClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL + '/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const authorizedClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL + '/api',
    headers: {
        Authorization: 'bearer ' + localStorage.getItem('accessToken'),
    }
})


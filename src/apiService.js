import axios from 'axios';

const baseURL = 'http://127.0.0.1:8001'; // Define your base URL here

const api = axios.create({
    baseURL: baseURL,
});

export default api;

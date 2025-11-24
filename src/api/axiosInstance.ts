import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BE_SERVER_URL}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

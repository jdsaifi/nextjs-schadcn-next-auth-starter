import axios from 'axios';

const baseURL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3044/api/v1';

const axiosClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosClient.interceptors.response.use((response) => response);

export default axiosClient;

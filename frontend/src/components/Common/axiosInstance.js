import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api'
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.error("No token found in localStorage");
        }
        console.log("Request Config:", config);
        return config;
    },
    (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Response:", response);
        return response;
    },
    (error) => {
        console.error("Response Error:", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
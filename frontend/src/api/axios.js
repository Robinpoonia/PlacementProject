import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    console.log("Axios Token:", token);
    console.log("Request URL:", config.url);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Authorization Header:", config.headers.Authorization);

    return config;
});
export default api;
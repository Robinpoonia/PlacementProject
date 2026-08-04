import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // IMPORTANT:
    // Do NOT globally set Content-Type to application/json.
    // Axios will automatically use:
    //
    // application/json for normal objects
    // multipart/form-data + boundary for FormData

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
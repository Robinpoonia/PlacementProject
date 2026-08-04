import api from "./axios";

export const getDashboard = async () => {
  const res = await api.get("/api/dashboard");
  return res.data;
};

export const getMyExperiences = async () => {
    const res = await api.get("/api/experience/user/my-experiences");
    return res.data;
};

export const updateExperience = async (id, data) => {
    const res = await api.put(`/api/experience/${id}`, data);
    return res.data;
};

export const deleteExperience = async (id) => {
    const res = await api.delete(`/api/experience/${id}`);
    return res.data;
};
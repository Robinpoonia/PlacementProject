import api from "./axios";

export const getResumes = async () => {
  const res = await api.get("/api/resume");
  console.log(res.data);
  return res.data;
};

export const uploadResume = async (formData) => {
  const res = await api.post(
    "/api/resume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const deleteResume = async (id) => {
  const res = await api.delete(`/api/resume/${id}`);
  return res.data;
};

export const setDefaultResume = async (id) => {
  const res = await api.put(`/api/resume/default/${id}`);
  return res.data;
};

export const getResume = async (id) => {
  const res = await api.get(`/api/resume/${id}`);
  return res.data;
};
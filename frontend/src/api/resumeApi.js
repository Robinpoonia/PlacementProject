import api from "./axios";

// =====================================================
// GET ALL RESUMES
// GET /api/resume
// Used on the public/explore resumes page
// =====================================================

export const getResumes = async () => {
  const res = await api.get("/api/resume");

  return res.data;
};

// =====================================================
// GET MY RESUMES
// GET /api/resume/my
// Used on Dashboard
// =====================================================

export const getMyResumes = async () => {
  const res = await api.get("/api/resume/my");

  return res.data;
};

// =====================================================
// UPLOAD RESUME
// =====================================================

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

// =====================================================
// DELETE RESUME
// =====================================================

export const deleteResume = async (id) => {
  const res = await api.delete(
    `/api/resume/${id}`
  );

  return res.data;
};

// =====================================================
// SET DEFAULT RESUME
// =====================================================

export const setDefaultResume = async (id) => {
  const res = await api.put(
    `/api/resume/default/${id}`
  );

  return res.data;
};

// =====================================================
// GET ONE RESUME
// =====================================================

export const getResume = async (id) => {
  const res = await api.get(
    `/api/resume/${id}`
  );

  return res.data;
};
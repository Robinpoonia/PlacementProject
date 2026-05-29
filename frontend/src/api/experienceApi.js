import api from "./axios";



export const getExperiences = async () => {

  const res =await api.get("/api/experience");
  return res.data;

};

export const createExperience =async (data) => {

  const res =await api.post("/api/experience",data);
  return res.data;

};


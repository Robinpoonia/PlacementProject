import api from "./axios";

export const getResumes =async () => {
  const res = await api.get("/api/resume/resumes");
  return res.data;

};



export const uploadResume = async ( file ) => {

  const data =new FormData();

  data.append( "resume",file);

  const res = await api.post("/api/resume",data,{
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

  return res.data;

};
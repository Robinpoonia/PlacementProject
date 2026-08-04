import api from "./axios";

// ============================================
// GET MY PROFILE
// ============================================

export const getMyProfile = async () => {
  const res = await api.get("/api/users/profile");

  return res.data;
};


// ============================================
// UPDATE PROFILE
// ============================================

export const updateMyProfile = async (data) => {
  const res = await api.put(
    "/api/users/profile",
    data
  );

  return res.data;
};


// ============================================
// UPLOAD PROFILE PICTURE
// ============================================

export const uploadProfilePicture = async (file) => {
  console.log("FILE RECEIVED IN API:", file);

  const formData = new FormData();

  formData.append(
    "profilePicture",
    file,
    file.name
  );

  console.log(
    "FORM DATA FILE:",
    formData.get("profilePicture")
  );

  const res = await api.put(
    "/api/users/profile/picture",
    formData

    // IMPORTANT:
    // Don't manually set Content-Type here.
    // Browser/Axios must create multipart boundary.
  );

  return res.data;
};

// ============================================
// GET ALL SENIORS
// ============================================

export const getAllSeniors = async () => {

  const res = await api.get(
    "/api/users/seniors"
  );

  return res.data;
};
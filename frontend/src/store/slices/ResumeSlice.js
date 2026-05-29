import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getResumes, uploadResume } from "../../api/resumeApi";

// --- Thunks ---

export const fetchResumes = createAsyncThunk(
  "resume/fetch",
  async () => {
    return await getResumes();
  }
);

export const uploadResumeAction = createAsyncThunk(
  "resume/upload",
  async (file) => {
    return await uploadResume(file);
  }
);

// --- Slice ---

const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    data: [],
    loading: false,       // For fetching resumes
    uploadLoading: false, // For uploading a resume
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Resumes Cases
      .addCase(fetchResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Upload Resume Cases
      .addCase(uploadResumeAction.pending, (state) => {
        state.uploadLoading = true;
        state.error = null;
      })
      .addCase(uploadResumeAction.fulfilled, (state) => {
        state.uploadLoading = false;
        // Note: If your API returns the newly uploaded resume object,
        // you could optionally push it to state.data here like this:
        // if (action.payload) state.data.push(action.payload);
      })
      .addCase(uploadResumeAction.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = action.error.message;
      });
  }
});

export default resumeSlice.reducer;
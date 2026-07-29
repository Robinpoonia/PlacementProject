import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getResumes,
  uploadResume,
  deleteResume,
  setDefaultResume,
} from "../../api/resumeApi";

export const fetchResumes = createAsyncThunk(
  "resume/fetch",
  async () => {
    return await getResumes();
  }
);

export const uploadResumeAction = createAsyncThunk(
  "resume/upload",
  async (formData) => {
    return await uploadResume(formData);
  }
);

export const deleteResumeAction = createAsyncThunk(
  "resume/delete",
  async (id) => {
    await deleteResume(id);
    return id;
  }
);

export const setDefaultResumeAction = createAsyncThunk(
  "resume/default",
  async (id) => {
    const data = await setDefaultResume(id);
    return data.resume;
  }
);

const resumeSlice = createSlice({
  name: "resume",

  initialState: {
    data: [],
    loading: false,
    uploadLoading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch
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

      // Upload
      .addCase(uploadResumeAction.pending, (state) => {
        state.uploadLoading = true;
        state.error = null;
      })

      .addCase(uploadResumeAction.fulfilled, (state, action) => {
        state.uploadLoading = false;

        if (action.payload.resume) {
          state.data.unshift(action.payload.resume);
        }
      })

      .addCase(uploadResumeAction.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = action.error.message;
      })

      // Delete
      .addCase(deleteResumeAction.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (resume) => resume._id !== action.payload
        );
      })

      // Default Resume
      .addCase(setDefaultResumeAction.fulfilled, (state, action) => {
        state.data = state.data.map((resume) => ({
          ...resume,
          isDefault: resume._id === action.payload._id,
        }));
      });
  },
});

export default resumeSlice.reducer;
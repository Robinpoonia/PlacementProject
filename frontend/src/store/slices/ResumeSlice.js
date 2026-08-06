import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getResumes,
  getMyResumes,
  uploadResume,
  deleteResume,
  setDefaultResume,
} from "../../api/resumeApi";

// =====================================================
// FETCH ALL RESUMES
// Used on Explore Resume page
// =====================================================

export const fetchResumes = createAsyncThunk(
  "resume/fetchAll",

  async (_, { rejectWithValue }) => {
    try {
      const data = await getResumes();

      // getAllResumes may return array directly
      // or { resumes: [] }
      return Array.isArray(data)
        ? data
        : data.resumes || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch resumes"
      );
    }
  }
);

// =====================================================
// FETCH LOGGED-IN USER'S RESUMES
// Used on Dashboard
// =====================================================

export const fetchMyResumes = createAsyncThunk(
  "resume/fetchMy",

  async (_, { rejectWithValue }) => {
    try {
      const data = await getMyResumes();

      return Array.isArray(data)
        ? data
        : data.resumes || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch your resumes"
      );
    }
  }
);

// =====================================================
// UPLOAD RESUME
// =====================================================

export const uploadResumeAction = createAsyncThunk(
  "resume/upload",

  async (formData, { rejectWithValue }) => {
    try {
      return await uploadResume(formData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to upload resume"
      );
    }
  }
);

// =====================================================
// DELETE RESUME
// =====================================================

export const deleteResumeAction = createAsyncThunk(
  "resume/delete",

  async (id, { rejectWithValue }) => {
    try {
      await deleteResume(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete resume"
      );
    }
  }
);

// =====================================================
// SET DEFAULT
// =====================================================

export const setDefaultResumeAction =
  createAsyncThunk(
    "resume/default",

    async (id, { rejectWithValue }) => {
      try {
        const data =
          await setDefaultResume(id);

        return data.resume;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to set default resume"
        );
      }
    }
  );

// =====================================================
// SLICE
// =====================================================

const resumeSlice = createSlice({
  name: "resume",

  initialState: {
    data: [],

    loading: false,

    uploadLoading: false,

    deleteLoading: false,

    defaultLoading: false,

    error: null,
  },

  reducers: {
    clearResumeError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =================================================
      // FETCH ALL RESUMES
      // =================================================

      .addCase(fetchResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchResumes.fulfilled,
        (state, action) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      .addCase(
        fetchResumes.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ||
            "Failed to fetch resumes";
        }
      )

      // =================================================
      // FETCH MY RESUMES
      // =================================================

      .addCase(
        fetchMyResumes.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchMyResumes.fulfilled,
        (state, action) => {
          state.loading = false;

          // IMPORTANT
          // Dashboard now contains only current user's resumes
          state.data = action.payload;
        }
      )

      .addCase(
        fetchMyResumes.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch your resumes";
        }
      )

      // =================================================
      // UPLOAD
      // =================================================

      .addCase(
        uploadResumeAction.pending,
        (state) => {
          state.uploadLoading = true;
          state.error = null;
        }
      )

      .addCase(
        uploadResumeAction.fulfilled,
        (state, action) => {
          state.uploadLoading = false;

          if (action.payload?.resume) {
            state.data.unshift(
              action.payload.resume
            );
          }
        }
      )

      .addCase(
        uploadResumeAction.rejected,
        (state, action) => {
          state.uploadLoading = false;

          state.error =
            action.payload ||
            "Failed to upload resume";
        }
      )

      // =================================================
      // DELETE
      // =================================================

      .addCase(
        deleteResumeAction.pending,
        (state) => {
          state.deleteLoading = true;
          state.error = null;
        }
      )

      .addCase(
        deleteResumeAction.fulfilled,
        (state, action) => {
          state.deleteLoading = false;

          state.data = state.data.filter(
            (resume) =>
              resume._id !== action.payload
          );
        }
      )

      .addCase(
        deleteResumeAction.rejected,
        (state, action) => {
          state.deleteLoading = false;

          state.error =
            action.payload ||
            "Failed to delete resume";
        }
      )

      // =================================================
      // SET DEFAULT
      // =================================================

      .addCase(
        setDefaultResumeAction.pending,
        (state) => {
          state.defaultLoading = true;
          state.error = null;
        }
      )

      .addCase(
        setDefaultResumeAction.fulfilled,
        (state, action) => {
          state.defaultLoading = false;

          state.data = state.data.map(
            (resume) => ({
              ...resume,

              isDefault:
                resume._id ===
                action.payload._id,
            })
          );
        }
      )

      .addCase(
        setDefaultResumeAction.rejected,
        (state, action) => {
          state.defaultLoading = false;

          state.error =
            action.payload ||
            "Failed to set default resume";
        }
      );
  },
});

export const { clearResumeError } =
  resumeSlice.actions;

export default resumeSlice.reducer;
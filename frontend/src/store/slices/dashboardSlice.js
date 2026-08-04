import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboard } from "../../api/dashboardApi";

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getDashboard();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load dashboard"
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState: {
    posts: [],
    resumes: [],
    loading: false,
    error: null,
    lastUpdated: null,
  },

  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },

    updatePostLocally: (state, action) => {
      const index = state.posts.findIndex(
        (p) => p._id === action.payload._id
      );

      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },

    deletePostLocally: (state, action) => {
      state.posts = state.posts.filter(
        (p) => p._id !== action.payload
      );
    },

    addResumeLocally: (state, action) => {
      state.resumes.unshift(action.payload);
    },

    deleteResumeLocally: (state, action) => {
      state.resumes = state.resumes.filter(
        (r) => r._id !== action.payload
      );
    },

    updateResumeLocally: (state, action) => {
      const index = state.resumes.findIndex(
        (r) => r._id === action.payload._id
      );

      if (index !== -1) {
        state.resumes[index] = action.payload;
      }
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts || [];
        state.resumes = action.payload.resumes || [];
        state.lastUpdated = Date.now();
      })

      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  clearDashboardError,
  updatePostLocally,
  deletePostLocally,
  addResumeLocally,
  deleteResumeLocally,
  updateResumeLocally,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getExperiences,
  getMyExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../api/experienceApi";

// =======================
// Thunks
// =======================

// Public Experiences
export const fetchExperiences = createAsyncThunk(
  "experience/fetch",
  async () => {
    return await getExperiences();
  }
);

// Logged-in User Experiences
export const fetchMyExperiences = createAsyncThunk(
  "experience/fetchMine",
  async () => {
    return await getMyExperiences();
  }
);

// Create Experience
export const createExperienceAction = createAsyncThunk(
  "experience/create",
  async (data) => {
    return await createExperience(data);
  }
);

// Update Experience
export const updateExperienceAction = createAsyncThunk(
  "experience/update",
  async ({ id, data }) => {
    return await updateExperience(id, data);
  }
);

// Delete Experience
export const deleteExperienceAction = createAsyncThunk(
  "experience/delete",
  async (id) => {
    await deleteExperience(id);
    return id;
  }
);

// =======================
// Slice
// =======================

const experienceSlice = createSlice({
  name: "experience",

  initialState: {
    data: [],
    loading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =======================
      // Fetch All Experiences
      // =======================

      .addCase(fetchExperiences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // =======================
      // Fetch My Experiences
      // =======================

      .addCase(fetchMyExperiences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMyExperiences.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchMyExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // =======================
      // Create Experience
      // =======================

      .addCase(createExperienceAction.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })

      .addCase(createExperienceAction.fulfilled, (state, action) => {
        state.createLoading = false;

        // Add newly created experience at top
        if (action.payload) {
          state.data.unshift(action.payload);
        }
      })

      .addCase(createExperienceAction.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.error.message;
      })

      // =======================
      // Update Experience
      // =======================

      .addCase(updateExperienceAction.pending, (state) => {
        state.updateLoading = true;
      })

      .addCase(updateExperienceAction.fulfilled, (state, action) => {
        state.updateLoading = false;

        const index = state.data.findIndex(
          (item) => item._id === action.payload._id
        );

        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      .addCase(updateExperienceAction.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.error.message;
      })

      // =======================
      // Delete Experience
      // =======================

      .addCase(deleteExperienceAction.pending, (state) => {
        state.deleteLoading = true;
      })

      .addCase(deleteExperienceAction.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.data = state.data.filter(
          (item) => item._id !== action.payload
        );
      })

      .addCase(deleteExperienceAction.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.error.message;
      });
  },
});

export default experienceSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getExperiences, createExperience } from "../../api/experienceApi";

// --- Thunks ---

export const fetchExperiences = createAsyncThunk(
  "experience/fetch",
  async () => {
    return await getExperiences();
  }
);

export const createExperienceAction = createAsyncThunk(
  "experience/create",
  async (data) => {
    return await createExperience(data);
  }
);

// --- Slice ---

const experienceSlice = createSlice({
  name: "experience",
  initialState: {
    data: [],
    loading: false,       // For fetching experience logs
    createLoading: false, // For creating a new experience log
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Experiences Cases
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

      // Create Experience Cases
      .addCase(createExperienceAction.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createExperienceAction.fulfilled, (state, action) => {
        state.createLoading = false;
        // Optional: If your API returns the newly created experience object,
        // you can immediately append it to your data array:
        // if (action.payload) state.data.push(action.payload);
      })
      .addCase(createExperienceAction.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.error.message;
      });
  }
});

export default experienceSlice.reducer;
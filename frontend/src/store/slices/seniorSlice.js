import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getAllSeniors,
} from "../../api/userApi";


// ============================================
// FETCH SENIORS
// ============================================

export const fetchSeniors = createAsyncThunk(
  "seniors/fetchSeniors",

  async (_, { rejectWithValue }) => {

    try {

      const data = await getAllSeniors();

      return data.users || [];

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to load seniors"
      );

    }
  }
);


// ============================================
// SLICE
// ============================================

const seniorSlice = createSlice({

  name: "seniors",

  initialState: {

    data: [],

    loading: false,

    error: null,

  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      // FETCH

      .addCase(
        fetchSeniors.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )

      .addCase(
        fetchSeniors.fulfilled,
        (state, action) => {

          state.loading = false;

          state.data = action.payload;

        }
      )

      .addCase(
        fetchSeniors.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to load seniors";

        }
      );

  },

});


export default seniorSlice.reducer;
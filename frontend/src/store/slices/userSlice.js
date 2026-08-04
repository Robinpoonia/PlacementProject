import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getMyProfile,
  updateMyProfile,
  uploadProfilePicture,
} from "../../api/userApi";


// ============================================
// FETCH PROFILE
// ============================================

export const fetchMyProfile = createAsyncThunk(
  "user/fetchMyProfile",

  async (_, { rejectWithValue }) => {
    try {
      const data = await getMyProfile();

      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to load profile"
      );
    }
  }
);


// ============================================
// UPDATE PROFILE
// ============================================

export const updateMyProfileAction = createAsyncThunk(
  "user/updateMyProfile",

  async (formData, { rejectWithValue }) => {
    try {
      const data = await updateMyProfile(formData);

      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    }
  }
);


// ============================================
// UPLOAD PROFILE PICTURE
// ============================================

export const uploadProfilePictureAction = createAsyncThunk(
  "user/uploadProfilePicture",

  async (file, { rejectWithValue }) => {
    try {
      const data = await uploadProfilePicture(file);

      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to upload profile picture"
      );
    }
  }
);


// ============================================
// SLICE
// ============================================

const userSlice = createSlice({
  name: "user",

  initialState: {
    profile: null,

    loading: false,

    updateLoading: false,

    // Separate loading for profile photo
    photoLoading: false,

    error: null,
  },

  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================================
      // FETCH PROFILE
      // =========================================

      .addCase(
        fetchMyProfile.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchMyProfile.fulfilled,
        (state, action) => {
          state.loading = false;

          state.profile = action.payload;
        }
      )

      .addCase(
        fetchMyProfile.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to load profile";
        }
      )


      // =========================================
      // UPDATE PROFILE
      // =========================================

      .addCase(
        updateMyProfileAction.pending,
        (state) => {
          state.updateLoading = true;
          state.error = null;
        }
      )

      .addCase(
        updateMyProfileAction.fulfilled,
        (state, action) => {
          state.updateLoading = false;

          state.profile = action.payload;
        }
      )

      .addCase(
        updateMyProfileAction.rejected,
        (state, action) => {
          state.updateLoading = false;

          state.error =
            action.payload ||
            "Failed to update profile";
        }
      )


      // =========================================
      // UPLOAD PROFILE PICTURE
      // =========================================

      .addCase(
        uploadProfilePictureAction.pending,
        (state) => {
          state.photoLoading = true;
          state.error = null;
        }
      )

      .addCase(
        uploadProfilePictureAction.fulfilled,
        (state, action) => {
          state.photoLoading = false;

          // Backend returns updated user
          state.profile = action.payload;
        }
      )

      .addCase(
        uploadProfilePictureAction.rejected,
        (state, action) => {
          state.photoLoading = false;

          state.error =
            action.payload ||
            "Failed to upload profile picture";
        }
      );
  },
});


export const {
  clearUserError,
} = userSlice.actions;


export default userSlice.reducer;
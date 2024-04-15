import {
  TUser,
  TUserCreationResponse,
  TUserRole,
} from "@/store/store.interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  user: null | TUser;
  isVerified: boolean;
  role: null | TUserRole;
  isLoggedIn: boolean;
  loading: boolean;
};

export const fetchUser = createAsyncThunk<TUserCreationResponse>(
  "auth/fetchUser",
  async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/users/me`,
      {
        credentials: "include",
      },
    );
    const result = await response.json();
    return result;
  },
);

const initialState: TAuthState = {
  user: null,
  isVerified: false,
  role: null,
  isLoggedIn: false,
  loading: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticate: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    logOut: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isVerified = false;
      state.role = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.user = action.payload.data;
        state.isLoggedIn = true;
        state.isVerified = action.payload.data.isVerified;
        state.role = action.payload.data.role;
      } else {
        state.user = null;
        state.isLoggedIn = false;
        state.isVerified = false;
        state.role = null;
      }
    });

    builder.addCase(fetchUser.rejected, (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isVerified = false;
      state.role = null;
    });
  },
});

export const { authenticate, logOut, setLoading } = userSlice.actions;
export default userSlice.reducer;

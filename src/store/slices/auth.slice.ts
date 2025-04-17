import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeToken, setToken } from "~/utils";
import { RootState } from "..";
import { AuthService } from "~/services";

interface AuthState {
  authenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  authenticated: false,
  loading: false,
};

export const signIn = createAsyncThunk(
  "login",
  async (payload: SignInInput, { rejectWithValue }) => {
    try {
      return await AuthService.signIn(payload);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signUp = createAsyncThunk(
  "register",
  async (payload: SignUpInput, { rejectWithValue }) => {
    try {
      return await AuthService.signUp(payload);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated(state) {
      state.authenticated = true;
    },
    logout(state) {
      state.authenticated = false;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.authenticated = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const token = action.payload.data.token;

        state.authenticated = true;
        state.loading = false;
        setToken(JSON.stringify(token));
      })
      .addCase(signIn.rejected, (state) => {
        state.loading = false;
        state.authenticated = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const token = action.payload.data.token;

        state.authenticated = true;
        state.loading = false;
        setToken(JSON.stringify(token));
      });
  },
});

export const selectAuthenticated = (state: RootState): boolean =>
  state.auth.authenticated;

export const { setAuthenticated, logout } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, type JwtPayload } from './authActions';
import { jwtDecode } from 'jwt-decode';

const tokenFromStorage = localStorage.getItem('token');
const decodedUser = tokenFromStorage
  ? jwtDecode<JwtPayload>(tokenFromStorage)
  : null;

type AuthState = {
  user: JwtPayload | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: AuthState = {
  user: decodedUser,
  token: tokenFromStorage,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.success = false;
      state.error = null;
      state.loading = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.user = payload.user;
        state.token = payload.token;
        localStorage.setItem('token', payload.token);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.user = payload.user;
        state.token = payload.token;
        localStorage.setItem('token', payload.token);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

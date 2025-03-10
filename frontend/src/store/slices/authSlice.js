import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
});

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => !!state.auth.token;

export const {
  setUser,
  setToken,
  setLoading,
  setError,
  login,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

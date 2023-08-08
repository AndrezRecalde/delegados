import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isLogin: false,
    user: {},
    profile: {},
    errores: undefined,
  },
  reducers: {
    onLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    onAuthenticate: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.isLogin = true;
    },
    onProfile: (state, { payload }) => {
      state.profile = payload;
      state.isLoading = false;
    },
    onLogout: (state, { payload }) => {
      state.isLoading = false;
      state.user = {};
      state.profile = {};
      state.isLogin = false;
      state.errores = payload;
    },
    clearErrores: (state) => {
      state.errores = undefined;
    },
  },
});

export const { onLoading, onAuthenticate, onProfile, onLogout, clearErrores } =
  authSlice.actions;

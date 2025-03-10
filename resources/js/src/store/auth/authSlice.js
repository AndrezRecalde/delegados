import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isLogin: false,
    user: {},
    profile: {},
    validate: undefined,
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
    onValidate: (state, { payload }) => {
        state.isLoading = false;
        state.validate = payload;
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

export const { onLoading, onAuthenticate, onProfile, onValidate, onLogout, clearErrores } =
  authSlice.actions;

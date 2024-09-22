import { createSlice } from "@reduxjs/toolkit";

export const usuarioSlice = createSlice({
  name: "usuario",
  initialState: {
    isLoading: false,
    usuarios: [],
    activeUsuario: null,
    message: undefined,
    errores: undefined,
  },
  reducers: {
    onLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    onUsuarios: (state, { payload }) => {
      state.usuarios = payload;
      state.errores = undefined;
      state.isLoading = false;
    },
    onAddUsuario: (state, { payload }) => {
      state.usuarios.push(payload);
      state.activeUsuario = null;
      state.errores = undefined;
    },
    onUpdateUsuario: (state, { payload }) => {
      state.usuarios = state.usuarios.map((usuario) => {
        if (usuario.id === payload.id) {
          return payload;
        }
        return usuario;
      });
      state.activeUsuario = null;
      state.errores = undefined;
    },
    onDeleteUsuario: (state) => {
      if (state.activeUsuario) {
        state.usuarios = state.usuarios.filter(
          (usuario) => usuario.id !== state.activeUsuario.id
        );
        state.activeUsuario = null;
        state.errores = undefined;
      }
    },
    onSetActivateUsuario: (state, { payload }) => {
      state.activeUsuario = payload;
      state.errores = undefined;
      state.isLoading = false;
    },
    onLoadMessage: (state, { payload }) => {
        state.message = payload;
    },
    onLoadErrores: (state, { payload }) => {
      state.errores = payload;
    },
    onClearUsuarios: (state) => {
      state.usuarios = [];
      state.activeUsuario = null;
      state.isLoading = false;
      state.errores = undefined;
    },
  },
});

export const {
  onLoading,
  onUsuarios,
  onAddUsuario,
  onUpdateUsuario,
  onDeleteUsuario,
  onSetActivateUsuario,
  onLoadMessage,
  onLoadErrores,
  onClearUsuarios,
} = usuarioSlice.actions;

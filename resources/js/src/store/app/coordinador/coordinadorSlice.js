import { createSlice } from "@reduxjs/toolkit";

export const coordinadorSlice = createSlice({
  name: "coordinador",
  initialState: {
    isLoading: false,
    coordinadores: [],
    activateCoordinador: null,
    errores: undefined,
  },
  reducers: {
    onLoading: (state) => {
      state.isLoading = true;
      state.errores = undefined;
    },
    onCoordinadores: (state, { payload }) => {
      state.coordinadores = payload;
      state.errores = undefined;
      state.isLoading = false;
    },
    onAddCoordinador: (state, { payload }) => {
      state.coordinadores.push(payload);
      state.activateCoordinador = null;
      state.errores = undefined;
    },
    onUpdateCoordinador: (state, { payload }) => {
      state.coordinadores = state.coordinadores.map((coordinador) => {
        if (coordinador.id === payload.id) {
          return payload;
        }
        return coordinador;
      });
      state.activateCoordinador = null;
      state.errores = undefined;
    },
    onDeleteCoordinador: (state) => {
      if (state.activateCoordinador) {
        state.coordinadores = state.coordinadores.filter(
          (coordinador) => coordinador.id !== state.activateCoordinador.id
        );
        state.activateCoordinador = null;
        state.errores = undefined;
      }
    },
    onSetActivateCoordinador: (state, { payload }) => {
      state.activateCoordinador = payload;
      state.errores = undefined;
      state.isLoading = false;
    },
    onClearCoordinadores: (state) => {
      state.coordinadores = [];
      state.errores = undefined;
    },
    onErrores: (state, { payload }) => {
      state.errores = payload;
    },
  },
});

export const {
  onLoading,
  onCoordinadores,
  onAddCoordinador,
  onUpdateCoordinador,
  onDeleteCoordinador,
  onSetActivateCoordinador,
  onClearCoordinadores,
  onErrores,
} = coordinadorSlice.actions;

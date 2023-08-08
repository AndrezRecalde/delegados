import { createSlice } from "@reduxjs/toolkit";

export const veedorSlice = createSlice({
  name: "veedor",
  initialState: {
    isLoading: false,
    veedores: [],
    activateVeedor: null,
    errores: undefined,
  },
  reducers: {
    onLoading: (state) => {
      state.isLoading = true;
      state.errores = undefined;
    },
    onVeedores: (state, { payload }) => {
      state.veedores = payload;
      state.errores = undefined;
      state.isLoading = false;
    },
    onAddVeedor: (state, { payload }) => {
      state.veedores.push(payload);
      state.activateVeedor = null;
      state.errores = undefined;
    },
    onUpdateVeedor: (state, { payload }) => {
      state.veedores = state.veedores.map((veedor) => {
        if (veedor.id === payload.id) {
          return payload;
        }
        return veedor;
      });
      state.activateVeedor = null;
      state.errores = undefined;
    },
    onDeleteVeedor: (state) => {
      if (state.activateVeedor) {
        state.veedores = state.veedores.filter(
          (veedor) => veedor.id !== state.activateVeedor.id
        );
        state.activateVeedor = null;
        state.errores = undefined;
      }
    },
    onSetActivateVeedor: (state, { payload }) => {
      state.activateVeedor = payload;
      state.errores = undefined;
      state.isLoading = false;
    },
    onClearVeedores: (state) => {
      state.veedores = [];
      state.errores = undefined;
    },
    onErrores: (state, { payload }) => {
      state.errores = payload;
    },
  },
});

export const {
  onLoading,
  onVeedores,
  onAddVeedor,
  onUpdateVeedor,
  onDeleteVeedor,
  onSetActivateVeedor,
  onClearVeedores,
  onErrores,
} = veedorSlice.actions;

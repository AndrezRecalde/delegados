import { createSlice } from "@reduxjs/toolkit";

export const supervisorSlice = createSlice({
  name: "supervisor",
  initialState: {
    isLoading: false,
    isExport: false,
    supervisores: [],
    activateSupervisor: null,
    message: undefined,
    errores: undefined,
  },
  reducers: {
    onLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    onExport: (state, { payload }) => {
        state.isExport = payload;
    },
    onSupervisores: (state, { payload }) => {
      state.supervisores = payload;
      state.errores = undefined;
      state.isLoading = false;
    },
    onAddSupervisor: (state, { payload }) => {
      state.supervisores.push(payload);
      state.activateSupervisor = null;
      state.errores = undefined;
    },
    onUpdateSupervisor: (state, { payload }) => {
      state.supervisores = state.supervisores.map((supervisor) => {
        if (supervisor.id === payload.id) {
          return payload;
        }
        return supervisor;
      });
      state.activateSupervisor = null;
      state.errores = undefined;
    },
    onDeleteSupervisor: (state) => {
      if (state.activateSupervisor) {
        state.supervisores = state.supervisores.filter(
          (supervisor) => supervisor.id !== state.activateSupervisor.id
        );
        state.activateSupervisor = null;
        state.errores = undefined;
      }
    },
    onSetActivateSupervisor: (state, { payload }) => {
      state.activateSupervisor = payload;
      state.errores = undefined;
      state.isLoading = false;
    },
    onLoadMessage: (state, { payload }) => {
        state.message = payload;
    },
    onLoadErrores: (state, { payload }) => {
      state.errores = payload;
    },
    onClearSupervisores: (state) => {
      state.supervisores = [];
      state.activateSupervisor = null;
      state.isLoading = false;
      state.isExport = false;
      state.errores = undefined;
    },
  },
});

export const {
  onLoading,
  onExport,
  onSupervisores,
  onAddSupervisor,
  onUpdateSupervisor,
  onDeleteSupervisor,
  onSetActivateSupervisor,
  onLoadMessage,
  onLoadErrores,
  onClearSupervisores,
} = supervisorSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

export const escaneadorSlice = createSlice({
    name: "escaneador",
    initialState: {
        isLoading: false,
        isExport: false,
        escaneadores: [],
        activateEscaneador: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onExport: (state, { payload }) => {
            state.isExport = payload;
        },
        onEscaneadores: (state, { payload }) => {
            state.escaneadores = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onAddEscaneador: (state, { payload }) => {
            state.escaneadores.push(payload);
            state.activateEscaneador = null;
            state.errores = undefined;
        },
        onUpdateEscaneador: (state, { payload }) => {
            state.escaneadores = state.escaneadores.map((escaneador) => {
                if (escaneador.id === payload.id) {
                    return payload;
                }
                return escaneador;
            });
            state.activateEscaneador = null;
            state.errores = undefined;
        },
        onDeleteEscaneador: (state) => {
            if (state.activateEscaneador) {
                state.escaneadores = state.escaneadores.filter(
                    (escaneador) =>
                        escaneador.id !== state.activateEscaneador.id
                );
                state.activateEscaneador = null;
                state.errores = undefined;
            }
        },
        onSetActivateEscaneador: (state, { payload }) => {
            state.activateEscaneador = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onClearEscaneador: (state) => {
            state.escaneadores = [];
            state.activateEscaneador = null,
            state.isLoading = false;
            state.isExport = false;
            state.errores = undefined;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
        },
    },
});

export const {
    onLoading,
    onExport,
    onEscaneadores,
    onAddEscaneador,
    onUpdateEscaneador,
    onDeleteEscaneador,
    onSetActivateEscaneador,
    onClearEscaneador,
    onLoadMessage,
    onLoadErrores,
} = escaneadorSlice.actions;

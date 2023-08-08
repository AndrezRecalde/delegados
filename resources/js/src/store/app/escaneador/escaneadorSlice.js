import { createSlice } from "@reduxjs/toolkit";

export const escaneadorSlice = createSlice({
    name: "escaneadorSlice",
    initialState: {
        isLoading: false,
        escaneadores: [],
        activateEscaneador: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
            state.errores = undefined;
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
            state.errores = undefined;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
        },
    },
});

export const {
    onLoading,
    onEscaneadores,
    onAddEscaneador,
    onUpdateEscaneador,
    onDeleteEscaneador,
    onSetActivateEscaneador,
    onClearEscaneador,
    onErrores,
} = escaneadorSlice.actions;

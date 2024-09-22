import { createSlice } from "@reduxjs/toolkit";

export const coordinadorSlice = createSlice({
    name: "coordinador",
    initialState: {
        isLoading: false,
        isExport: false,
        coordinadores: [],
        activateCoordinador: null,
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
                    (coordinador) =>
                        coordinador.id !== state.activateCoordinador.id
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
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
        },
        onClearCoordinadores: (state) => {
            state.coordinadores = [];
            state.activateCoordinador = null;
            state.isLoading = false;
            state.isExport = false;
            state.errores = undefined;
        },
    },
});

export const {
    onLoading,
    onExport,
    onCoordinadores,
    onAddCoordinador,
    onUpdateCoordinador,
    onDeleteCoordinador,
    onSetActivateCoordinador,
    onLoadMessage,
    onLoadErrores,
    onClearCoordinadores,
} = coordinadorSlice.actions;

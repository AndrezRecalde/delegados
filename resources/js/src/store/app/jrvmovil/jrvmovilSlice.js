import { createSlice } from "@reduxjs/toolkit";

export const jrvmovilSlice = createSlice({
    name: "jrvmovil",
    initialState: {
        isLoading: false,
        isExport: false,
        jrvmoviles: [],
        activateJrvmovil: null,
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
        onJrvmoviles: (state, { payload }) => {
            state.jrvmoviles = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onAddJrvmovil: (state, { payload }) => {
            state.jrvmoviles.push(payload);
            state.activateJrvmovil = null;
            state.errores = undefined;
        },
        onUpdateJrvmovil: (state, { payload }) => {
            state.jrvmoviles = state.jrvmoviles.map((jrvmovil) => {
                if (jrvmovil.id === payload.id) {
                    return payload;
                }
                return jrvmovil;
            });
            state.activateJrvmovil = null;
            state.errores = undefined;
        },
        onDeleteJrvmovil: (state) => {
            if (state.activateJrvmovil) {
                state.jrvmoviles = state.jrvmoviles.filter(
                    (jrvmovil) => jrvmovil.id !== state.activateJrvmovil.id
                );
                state.activateJrvmovil = null;
                state.errores = undefined;
            }
        },
        onSetActivateJrvmovil: (state, { payload }) => {
            state.activateJrvmovil = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
        },
        onClearJrvmovil: (state) => {
            state.jrvmoviles = [];
            state.activateJrvmovil = null;
            state.isLoading = false;
            state.isExport = false;
            state.errores = undefined;
        },
    },
});

export const {
    onLoading,
    onExport,
    onJrvmoviles,
    onAddJrvmovil,
    onUpdateJrvmovil,
    onDeleteJrvmovil,
    onSetActivateJrvmovil,
    onClearJrvmovil,
    onLoadMessage,
    onLoadErrores,
} = jrvmovilSlice.actions;

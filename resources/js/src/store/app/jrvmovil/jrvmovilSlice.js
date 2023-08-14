import { createSlice } from "@reduxjs/toolkit";

export const jrvmovilSlice = createSlice({
    name: "jrvmovil",
    initialState: {
        isLoading: false,
        jrvmoviles: [],
        activateJrvmovil: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
            state.errores = undefined;
        },
        onJrvmoviles: (state, { payload }) => {
            state.jrvmoviles = payload;
            state.errores = undefined;
            state.isLoading;
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
        onClearJrvmovil: (state) => {
            state.jrvmoviles = [];
            state.errores = undefined;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
        },
    },
});

export const {
    onLoading,
    onJrvmoviles,
    onAddJrvmovil,
    onUpdateJrvmovil,
    onDeleteJrvmovil,
    onSetActivateJrvmovil,
    onClearJrvmovil,
    onErrores,
} = jrvmovilSlice.actions;

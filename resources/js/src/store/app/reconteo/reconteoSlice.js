import { createSlice } from "@reduxjs/toolkit";

export const reconteoSlice = createSlice({
    name: "reconteo",
    initialState: {
        isLoading: false,
        reconteos: [],
        activateReconteo: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
            state.errores = undefined;
        },
        onReconteos: (state, { payload }) => {
            state.reconteos = payload;
            state.errores = undefined;
            state.isLoading;
        },
        onAddReconteo: (state, { payload }) => {
            state.reconteos.push(payload);
            state.activateReconteo = null;
            state.errores = undefined;
        },
        onUpdateReconteo: (state, { payload }) => {
            state.reconteos = state.reconteos.map((reconteo) => {
                if (reconteo.id === payload.id) {
                    return payload;
                }
                return reconteo;
            });
            state.activateReconteo = null;
            state.errores = undefined;
        },
        onDeleteReconteo: (state) => {
            if (state.activateReconteo) {
                state.reconteos = state.reconteos.filter(
                    (reconteo) => reconteo.id !== state.activateReconteo.id
                );
                state.activateReconteo = null;
                state.errores = undefined;
            }
        },
        onSetActivateReconteo: (state, { payload }) => {
            state.activateReconteo = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onClearReconteos: (state) => {
            state.reconteos = [];
            state.errores = undefined;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
        },
    },
});

export const {
    onLoading,
    onReconteos,
    onAddReconteo,
    onUpdateReconteo,
    onDeleteReconteo,
    onSetActivateReconteo,
    onClearReconteos,
    onErrores,
} = reconteoSlice.actions;

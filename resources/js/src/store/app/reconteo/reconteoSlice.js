import { createSlice } from "@reduxjs/toolkit";

export const reconteoSlice = createSlice({
    name: "reconteo",
    initialState: {
        isLoading: false,
        isExport: false,
        reconteos: [],
        activateReconteo: null,
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
            state.activateReconteo = null;
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
    onReconteos,
    onAddReconteo,
    onUpdateReconteo,
    onDeleteReconteo,
    onSetActivateReconteo,
    onClearReconteos,
    onLoadMessage,
    onLoadErrores,
} = reconteoSlice.actions;

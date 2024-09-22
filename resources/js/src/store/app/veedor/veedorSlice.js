import { createSlice } from "@reduxjs/toolkit";

export const veedorSlice = createSlice({
    name: "veedor",
    initialState: {
        isLoading: false,
        isExport: false,
        veedores: [],
        activateVeedor: null,
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
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
        },
        onClearVeedores: (state) => {
            state.veedores = [];
            state.activateVeedor = null;
            state.isLoading = false;
            state.isExport = false;
            state.errores = undefined;
        },
    },
});

export const {
    onLoading,
    onExport,
    onVeedores,
    onAddVeedor,
    onUpdateVeedor,
    onDeleteVeedor,
    onSetActivateVeedor,
    onLoadMessage,
    onLoadErrores,
    onClearVeedores,
} = veedorSlice.actions;

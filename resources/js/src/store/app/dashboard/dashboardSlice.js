import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        isLoading: false,
        totalSupervisores: 0,
        totalCoordinadores: 0,
        totalVeedores: 0,
        totalConfirmados: 0,
        totalUsuarios: 0,
        totalEscaneadores: 0,
        totalJuntas: 0,
        avanceCantones: []
        /* errores: undefined */
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadTotalSupervisores: (state, { payload }) => {
            state.totalSupervisores = payload;
        },
        onLoadTotalCoordinadores: (state, { payload }) => {
            state.totalCoordinadores = payload;
        },
        onLoadTotalVeedores: (state, { payload }) => {
            state.totalVeedores = payload;
        },
        onLoadTotalConfirmados: (state, { payload }) => {
            state.totalConfirmados = payload;
        },
        onLoadTotalUsuarios: (state, { payload }) => {
            state.totalUsuarios = payload;
        },
        onLoadTotalEscaneadores: (state, { payload }) => {
            state.totalEscaneadores = payload;
        },
        onLoadTotalJuntas: (state, { payload }) => {
            state.totalJuntas = payload;
        },
        onLoadAvanceCantones: (state, { payload }) => {
            state.avanceCantones = payload;
            state.isLoading = false;
        },
        onClearTotales: (state) => {
            state.isLoading = false;
            state.totalSupervisores = 0;
            state.totalCoordinadores = 0;
            state.totalVeedores = 0;
            state.totalConfirmados = 0;
            state.totalUsuarios = 0;
            state.totalEscaneadores = 0;
            state.totalJuntas = 0;
            state.avanceCantones = []
            /* state.errores = udnefined; */
        }
    },
});

export const {
    onLoading,
    onLoadTotalSupervisores,
    onLoadTotalCoordinadores,
    onLoadTotalVeedores,
    onLoadTotalConfirmados,
    onLoadTotalUsuarios,
    onLoadTotalEscaneadores,
    onLoadTotalJuntas,
    onLoadAvanceCantones,
    onClearTotales
} = dashboardSlice.actions;

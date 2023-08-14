import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        isLoading: false,
        totalSupervisores: 0,
        totalCoordinadores: 0,
        totalVeedores: 0,
        totalConfirmados: 0,
        totalJrvMoviles: 0,
        totalJrvReconteo: 0,
        totalUsuarios: 0,
        totalEscaneadores: 0,
        totalJuntas: 0,
        avanceCantones: [],
        avanceParroquias: [],
        avanceRecintos: [],
        activateParroquia: null,
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
        onLoadTotalJrvMoviles: (state, { payload }) => {
            state.totalJrvMoviles = payload;
        },
        onLoadTotalJrvReconteo: (state, { payload }) => {
            state.totalJrvReconteo = payload;
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
        onLoadAvanceParroquias: (state, { payload }) => {
            state.avanceParroquias = payload;
            state.isLoading = false;
        },
        onLoadAvanceRecintos: (state, { payload }) => {
            state.avanceRecintos = payload;
            state.isLoading = false;
        },
        onSetActivateParroquia: (state, { payload }) => {
            state.activateParroquia = payload;
        },
        onClearTotales: (state) => {
            state.isLoading = false;
            state.totalSupervisores = 0;
            state.totalCoordinadores = 0;
            state.totalVeedores = 0;
            state.totalConfirmados = 0;
            state.totalJrvMoviles = 0;
            state.totalJrvReconteo = 0;
            state.totalUsuarios = 0;
            state.totalEscaneadores = 0;
            state.totalJuntas = 0;
            state.avanceCantones = [];
            state.avanceParroquias = [];
            state.avanceRecintos = [];
            state.activateParroquia = null;
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
    onLoadTotalJrvMoviles,
    onLoadTotalJrvReconteo,
    onLoadTotalUsuarios,
    onLoadTotalEscaneadores,
    onLoadTotalJuntas,
    onLoadAvanceCantones,
    onLoadAvanceParroquias,
    onLoadAvanceRecintos,
    onSetActivateParroquia,
    onClearTotales
} = dashboardSlice.actions;

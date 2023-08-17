import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        isLoading: false,
        isLoadingTableParr: false,
        isLoadingTableRec: false,
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
        activateCanton: null,
        activateParroquia: null,
        /* errores: undefined */
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadingTableParr: (state) => {
            state.isLoadingTableParr = true;
        },
        onLoadingTableRec: (state) => {
            state.isLoadingTableRec = true;
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
            state.isLoadingTableParr = false;
        },
        onLoadAvanceRecintos: (state, { payload }) => {
            state.avanceRecintos = payload;
            state.isLoadingTableRec = false;
        },
        onSetActivateCanton: (state, { payload }) => {
            state.activateCanton = payload;
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
            state.activateCanton = null;
            state.activateParroquia = null;
            /* state.errores = udnefined; */
        }
    },
});

export const {
    onLoading,
    onLoadingTableParr,
    onLoadingTableRec,
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
    onSetActivateCanton,
    onSetActivateParroquia,
    onClearTotales
} = dashboardSlice.actions;

import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import {
    coordinadorSlice,
    dashboardSlice,
    escaneadorSlice,
    juntaSlice,
    roleSlice,
    stateSlice,
    supervisorSlice,
    uiCoordinadorSlice,
    uiEscaneadorSlice,
    uiSupervisorSlice,
    uiUsuarioSlice,
    uiVeedorSlice,
    usuarioSlice,
    veedorSlice,
} from "./app";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        role: roleSlice.reducer,
        dashboard: dashboardSlice.reducer,
        usuario: usuarioSlice.reducer,
        state: stateSlice.reducer,
        junta: juntaSlice.reducer,
        uiUsuario: uiUsuarioSlice.reducer,
        supervisor: supervisorSlice.reducer,
        uiSupervisor: uiSupervisorSlice.reducer,
        coordinador: coordinadorSlice.reducer,
        uiCoordinador: uiCoordinadorSlice.reducer,
        veedor: veedorSlice.reducer,
        uiVeedor: uiVeedorSlice.reducer,
        escaner: escaneadorSlice.reducer,
        uiEscaner: uiEscaneadorSlice.reducer,
    },
});

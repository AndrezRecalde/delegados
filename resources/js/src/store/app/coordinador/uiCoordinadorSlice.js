import { createSlice } from "@reduxjs/toolkit";

export const uiCoordinadorSlice = createSlice({
    name: "uiCoordinador",
    initialState: {
        isOpenModalCoordinador: false,
        isOpenModalImportCoord: false,
    },
    reducers: {
        onOpenModalCoordinador: (state) => {
            state.isOpenModalCoordinador = true;
        },
        onCloseModalCoordinador: (state) => {
            state.isOpenModalCoordinador = false;
        },
        onOpenModalImportCoord: (state) => {
            state.isOpenModalImportCoord = true;
        },
        onCloseModalImportCoord: (state) => {
            state.isOpenModalImportCoord = false;
        },
    },
});

export const {
    onOpenModalCoordinador,
    onCloseModalCoordinador,
    onOpenModalImportCoord,
    onCloseModalImportCoord,
} = uiCoordinadorSlice.actions;

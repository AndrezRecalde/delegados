import { createSlice } from "@reduxjs/toolkit";

export const uiEscaneadorSlice = createSlice({
    name: "uiEscaneador",
    initialState: {
        isOpenModalEscaneador: false,
        isOpenModalImportEscaner: false,
    },
    reducers: {
        onOpenModalEscaneador: (state) => {
            state.isOpenModalEscaneador = true;
        },
        onCloseModalEscaneador: (state) => {
            state.isOpenModalEscaneador = false;
        },
        onOpenModalImportEscaner: (state) => {
            state.isOpenModalImportEscaner = true;
        },
        onCloseModalImportEscaner: (state) => {
            state.isOpenModalImportEscaner = false;
        },
    },
});

export const {
    onOpenModalEscaneador,
    onCloseModalEscaneador,
    onOpenModalImportEscaner,
    onCloseModalImportEscaner,
} = uiEscaneadorSlice.actions;

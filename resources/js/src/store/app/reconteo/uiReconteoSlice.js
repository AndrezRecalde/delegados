import { createSlice } from "@reduxjs/toolkit";

export const uiReconteoSlice = createSlice({
    name: "uiReconteo",
    initialState: {
        isOpenModalReconteo: false,
        isOpenModalImportReconteo: false,
    },
    reducers: {
        onOpenModalReconteo: (state) => {
            state.isOpenModalReconteo = true;
        },
        onCloseModalReconteo: (state) => {
            state.isOpenModalReconteo = false;
        },
        onOpenModalImportReconteo: (state) => {
            state.isOpenModalImportReconteo = true;
        },
        onCloseModalImportReconteo: (state) => {
            state.isOpenModalImportReconteo = false;
        },
    },
});

export const {
    onOpenModalReconteo,
    onCloseModalReconteo,
    onOpenModalImportReconteo,
    onCloseModalImportReconteo,
} = uiReconteoSlice.actions;

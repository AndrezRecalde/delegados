import { createSlice } from "@reduxjs/toolkit";

export const uiJrvmovilSlice = createSlice({
    name: "uiJrvmovil",
    initialState: {
        isOpenModalJrvmovil: false,
        isOpenModalImportJrvmovil: false,
    },
    reducers: {
        onOpenModalJrvmovil: (state) => {
            state.isOpenModalJrvmovil = true;
        },
        onCloseModalJrvmovil: (state) => {
            state.isOpenModalJrvmovil = false;
        },
        onOpenModalImportJrvmovil: (state) => {
            state.isOpenModalImportJrvmovil = true;
        },
        onCloseModalImportJrvmovil: (state) => {
            state.isOpenModalImportJrvmovil = false;
        },
    },
});

export const {
    onOpenModalJrvmovil,
    onCloseModalJrvmovil,
    onOpenModalImportJrvmovil,
    onCloseModalImportJrvmovil,
} = uiJrvmovilSlice.actions;

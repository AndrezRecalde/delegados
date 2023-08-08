import { createSlice } from "@reduxjs/toolkit";

export const uiVeedorSlice = createSlice({
    name: "varName",
    initialState: {
        isOpenModalVeedor: false,
        isOpenModalFileVeedor: false,
        isOpenActiveVeedor: false,
    },
    reducers: {
        onOpenModalVeedor: (state) => {
            state.isOpenModalVeedor = true;
        },
        onCloseModalVeedor: (state) => {
            state.isOpenModalVeedor = false;
        },
        onOpenModalFileVeedor: (state) => {
            state.isOpenModalFileVeedor = true;
        },
        onCloseModalFileVeedor: (state) => {
            state.isOpenModalFileVeedor = false;
        },
        onOpenActiveVeedor: (state) => {
            state.isOpenActiveVeedor = true;
        },
        onCloseActiveVeedor: (state) => {
            state.isOpenActiveVeedor = false;
        },
    },
});

export const {
    onOpenModalVeedor,
    onCloseModalVeedor,
    onOpenModalFileVeedor,
    onCloseModalFileVeedor,
    onOpenActiveVeedor,
    onCloseActiveVeedor,
} = uiVeedorSlice.actions;

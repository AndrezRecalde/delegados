import { createSlice } from "@reduxjs/toolkit";

export const uiSupervisorSlice = createSlice({
    name: "uiSupervisor",
    initialState: {
        isOpenModalSupervisor: false,
        isOpenModalImportSuper: false,
    },
    reducers: {
        onOpenModalSupervisor: (state) => {
            state.isOpenModalSupervisor = true;
        },
        onCloseModalSupervisor: (state) => {
            state.isOpenModalSupervisor = false;
        },
        onOpenModalImportSuper: (state) => {
            state.isOpenModalImportSuper = true;
        },
        onCloseModalImportSuper: (state) => {
            state.isOpenModalImportSuper = false;
        },
    },
});

export const {
    onOpenModalSupervisor,
    onCloseModalSupervisor,
    onOpenModalImportSuper,
    onCloseModalImportSuper,
} = uiSupervisorSlice.actions;

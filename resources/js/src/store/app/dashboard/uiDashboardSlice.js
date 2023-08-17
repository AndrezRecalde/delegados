import { createSlice } from "@reduxjs/toolkit";

export const uiDashboardSlice = createSlice({
    name: "uiDashboard",
    initialState: {
        isOpenModalAvanceParroquia: false,
        isOpenModalAvanceRecinto: false,
    },
    reducers: {
        onOpenModalAvanceParroquia: (state) => {
            state.isOpenModalAvanceParroquia = true;
        },
        onCloseModalAvanceParroquia: (state) => {
            state.isOpenModalAvanceParroquia = false;
        },
        onOpenModalAvanceRecinto: (state) => {
            state.isOpenModalAvanceRecinto = true;
        },
        onCloseModalAvanceRecinto: (state) => {
            state.isOpenModalAvanceRecinto = false;
        },
    },
});

export const {
    onOpenModalAvanceRecinto,
    onCloseModalAvanceRecinto,
    onOpenModalAvanceParroquia,
    onCloseModalAvanceParroquia,
} = uiDashboardSlice.actions;

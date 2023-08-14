import { createSlice } from "@reduxjs/toolkit";

export const uiDashboardSlice = createSlice({
    name: "uiDashboard",
    initialState: {
        isOpenModalAvanceRecinto: false,
    },
    reducers: {
        onOpenModalAvanceRecinto: (state) => {
            state.isOpenModalAvanceRecinto = true;
        },
        onCloseModalAvanceRecinto: (state) => {
            state.isOpenModalAvanceRecinto = false;
        },
    },
});

export const { onOpenModalAvanceRecinto, onCloseModalAvanceRecinto } =
    uiDashboardSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
    name: "role",
    initialState: {
        roles: [],
    },
    reducers: {
        onLoadRoles: (state, { payload }) => {
            state.roles = payload;
        },
        onClearRoles: (state) => {
            state.roles = [];
        },
    },
});

export const { onLoadRoles, onClearRoles } = roleSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

export const juntaSlice = createSlice({
    name: "junta",
    initialState: {
        juntas: [],
    },
    reducers: {
        onLoadJuntas: (state, { payload }) => {
            state.juntas = payload;
        },
        onClearJuntas: (state) => {
            state.juntas = [];
        },
    },
});

export const { onLoadJuntas, onClearJuntas } = juntaSlice.actions;

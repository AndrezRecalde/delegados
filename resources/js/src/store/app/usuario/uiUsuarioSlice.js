import { createSlice } from "@reduxjs/toolkit";

export const uiUsuarioSlice = createSlice({
  name: "uiUsuario",
  initialState: {
    isOpenModalUser: false,
    isOpenModalActivateUser: false,
  },
  reducers: {
    onOpenModalUser: (state) => {
      state.isOpenModalUser = true;
    },
    onCloseModalUser: (state) => {
      state.isOpenModalUser = false;
    },
    onOpenModalActivateUser: (state) => {
      state.isOpenModalActivateUser = true;
    },
    onCloseModalActivateUser: (state) => {
      state.isOpenModalActivateUser = false;
    },
  },
});

export const {
  onOpenModalUser,
  onCloseModalUser,
  onOpenModalActivateUser,
  onCloseModalActivateUser,
} = uiUsuarioSlice.actions;

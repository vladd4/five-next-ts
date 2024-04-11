import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AlertSlice = {
  showAlert: boolean;
  showInputAlert: boolean;
  isTelegram: boolean;
  isEdit: boolean;
  editValue: "name" | "phone" | "telegram";
};

const initialState: AlertSlice = {
  showAlert: false,
  showInputAlert: false,
  isTelegram: false,
  isEdit: false,
  editValue: "name",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setShowAlert: (state, action: PayloadAction<boolean>) => {
      state.showAlert = action.payload;
    },
    setShowInputAlert: (state, action: PayloadAction<boolean>) => {
      state.showInputAlert = action.payload;
    },
    setIsTelegram: (state, action: PayloadAction<boolean>) => {
      state.isTelegram = action.payload;
    },
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    },
    setEditValue: (
      state,
      action: PayloadAction<"name" | "phone" | "telegram">
    ) => {
      state.editValue = action.payload;
    },
  },
});

export const {
  setShowAlert,
  setShowInputAlert,
  setIsTelegram,
  setIsEdit,
  setEditValue,
} = alertSlice.actions;
export default alertSlice.reducer;

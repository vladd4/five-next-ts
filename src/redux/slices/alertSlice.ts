import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AlertSlice = {
  showAlert: boolean;
  showConfirmAlert: boolean;
  deletedId: number | null;
  showInputAlert: boolean;
  isTelegram: boolean;
  isEdit: boolean;
  showEditSaved: boolean;
  editValue: "name" | "phone" | "telegram";
};

const initialState: AlertSlice = {
  showAlert: false,
  showInputAlert: false,
  showEditSaved: false,
  deletedId: null,
  isTelegram: false,
  isEdit: false,
  showConfirmAlert: false,
  editValue: "name",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setShowAlert: (state, action: PayloadAction<boolean>) => {
      state.showAlert = action.payload;
    },
    setShowEditSaved: (state, action: PayloadAction<boolean>) => {
      state.showEditSaved = action.payload;
    },
    setDeletedId: (state, action: PayloadAction<number>) => {
      state.deletedId = action.payload;
    },
    setShowConfirmAlert: (state, action: PayloadAction<boolean>) => {
      state.showConfirmAlert = action.payload;
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
  setShowConfirmAlert,
  setEditValue,
  setDeletedId,
  setShowEditSaved
} = alertSlice.actions;
export default alertSlice.reducer;

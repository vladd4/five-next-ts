import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AlertSlice = {
  showAlert: boolean
}

const initialState: AlertSlice = { 
  showAlert: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setShowAlert: (state, action: PayloadAction<boolean>) => {
      state.showAlert = action.payload;
    },
  },
});

export const { setShowAlert } = alertSlice.actions;
export default alertSlice.reducer;
   
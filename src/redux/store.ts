import { configureStore } from "@reduxjs/toolkit";
import carsSlice from "./slices/carsSlice";
import filtersSlice from "./slices/filtersSlice";
import userSlice from "./slices/userSlice";
import savedSlice from "./slices/savedSlice";
import alertSlice from "./slices/alertSlice";

const store = configureStore({
  reducer: {
    cars: carsSlice,
    filters: filtersSlice,
    user: userSlice,
    saved: savedSlice,
    alert: alertSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
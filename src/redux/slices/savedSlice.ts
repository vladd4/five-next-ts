import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type AddSavedItem = {
    client_id: number;
    brand_id?: number;
    model_id?: number;
    min_price?: string;
    max_price?: string;
    fuel_id?: number;
    type_id?: number;
    min_year?: string;
    max_year?: string;
    min_mileage?: string
    max_mileage?: string
    min_power?: string
    max_power?: string
    gearbox_id?: number;
    state_id?: number;
    telegram: boolean;
}

type SavedItem = {
    id: number
    brand: string | null
    model: string | null
    gearbox: string | null
    fuel: string | null
    type: string | null
    state: string | null
    telegram: number
    min_year: string | null
    max_year: string | null
    min_mileage: string | null
    max_mileage: string | null
    min_power: string | null
    max_power: string | null
    min_price: string | null
    max_price: string | null
}


type SavedSlice = {
  saved: SavedItem[],
  status: 'loading' | "loaded"
}

export const addToSaved = createAsyncThunk<SavedItem, AddSavedItem>(
  "saved/addToSaved",
  async (params) => {
    const data = await axios.post(`http://localhost:5000/saved/`, params);
    return data.data;
  }
);

export const fetchSaved = createAsyncThunk<SavedItem[], number>(
  "saved/fetchSaved",
  async (userID) => {
    const data = await axios.get(`http://localhost:5000/saved/${userID}`);
    return data.data;
  }
);

export const deleteSaved = createAsyncThunk<number, number>(
  "saved/deleteSaved",
  async (savedID) => {
    await axios.delete(`http://localhost:5000/saved/${savedID}`);
    return savedID;
  }
);

const initialState: SavedSlice = {
  saved: [],
  status: "loading",
};

export const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(addToSaved.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToSaved.fulfilled, (state) => {
        state.status = "loaded";
      })
      .addCase(addToSaved.rejected, (state) => {
        state.status = "loading";
      })
      // Fetch
      .addCase(fetchSaved.pending, (state) => {
        state.saved = [];
        state.status = "loading";
      })
      .addCase(fetchSaved.fulfilled, (state, action) => {
        state.saved = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchSaved.rejected, (state) => {
        state.saved = [];
        state.status = "loading";
      })
      // Delete
      .addCase(deleteSaved.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSaved.fulfilled, (state, action) => {
        state.saved = state.saved.filter((save) => save.id !== action.payload);
        state.status = "loaded";
      })
      .addCase(deleteSaved.rejected, (state) => {
        state.status = "loading";
      });
  },
  
});

export default savedSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


type Car = {
  car_id: string
  brand: string
  model: string
  year: string
  price: string
  mileage: string
  photo_url: string
  gearbox: string
  fuel: string
  type: string
  power: string
  site_name: string
  site_photo_url: string
  state: string
  link: string
}
type CarsSlice = {
  cars: Car[]
  status: 'loading' | "loaded"
}

type Filters = {
  brand?: string;
  model?: string;
  gearbox?: string;
  state?: string;
  type?: string;
  year?: {
    from: string;
    to: string;
  };
  fuel?: string;
  price?: {
    from: string;
    to: string;
  };
  power?: {
    from: string;
    to: string;
  };
}

export const fetchCars = createAsyncThunk<Car[]>("cars/fetchCars", async () => {
  const data = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/cars`);
  return data.data;
});

export const fetchFilterCars = createAsyncThunk<Car[], Filters>(
  "cars/fetchFilterCars",
  async (params) => {
    const data = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/cars`, params);
    return data.data;
  }
);

const initialState: CarsSlice = {
  cars: [],
  status: "loading",
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.cars = [];
        state.status = "loading";
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchCars.rejected, (state) => {
        state.cars = [];
        state.status = "loading";
      })
      .addCase(fetchFilterCars.pending, (state) => {
        state.cars = [];
        state.status = "loading";
      })
      .addCase(fetchFilterCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchFilterCars.rejected, (state) => {
        state.cars = [];
        state.status = "loading";
      });
  },
  
});

export default carsSlice.reducer;

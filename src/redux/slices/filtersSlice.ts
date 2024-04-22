import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type TValue = {
  id: number;
  value: string;
};

type Filters = {
  brands: TValue[];
  models: TValue[];
  fuel: TValue[];
  type: TValue[];
  gear: TValue[];
  state: TValue[];
};

interface FiltersSlice extends Filters {
  status: "loading" | "loaded";
  showFilters: boolean;
}

export const fetchBrands = createAsyncThunk<TValue[]>(
  "filters/fetchBrands",
  async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/filters/brands`
    );
    return data.data;
  }
);

export const fetchModels = createAsyncThunk<TValue[], string>(
  "filters/fetchModels",
  async (brand) => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/filters/models`,
      {
        params: { brand },
      }
    );
    return data.data;
  }
);

export const fetchFuel = createAsyncThunk<TValue[]>(
  "filters/fetchFuel",
  async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/filters/fuel`
    );
    return data.data;
  }
);

export const fetchGear = createAsyncThunk<TValue[]>(
  "filters/fetchGear",
  async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/filters/gear`
    );
    return data.data;
  }
);

export const fetchState = createAsyncThunk<TValue[]>(
  "filters/fetchState",
  async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/filters/state`
    );
    return data.data;
  }
);

export const fetchType = createAsyncThunk<TValue[]>(
  "filters/fetchType",
  async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/filters/type`
    );
    return data.data;
  }
);

const initialState: FiltersSlice = {
  brands: [],
  models: [],
  fuel: [],
  type: [],
  gear: [],
  state: [],
  status: "loading",
  showFilters: false,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setShowFilters: (state, action: PayloadAction<boolean>) => {
      state.showFilters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.brands = [];
        state.status = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchBrands.rejected, (state) => {
        state.brands = [];
        state.status = "loading";
      })
      .addCase(fetchModels.pending, (state) => {
        state.models = [];
        state.status = "loading";
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.models = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchModels.rejected, (state) => {
        state.models = [];
        state.status = "loading";
      })
      .addCase(fetchFuel.pending, (state) => {
        state.fuel = [];
        state.status = "loading";
      })
      .addCase(fetchFuel.fulfilled, (state, action) => {
        state.fuel = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchFuel.rejected, (state) => {
        state.fuel = [];
        state.status = "loading";
      })
      .addCase(fetchGear.pending, (state) => {
        state.gear = [];
        state.status = "loading";
      })
      .addCase(fetchGear.fulfilled, (state, action) => {
        state.gear = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchGear.rejected, (state) => {
        state.gear = [];
        state.status = "loading";
      })
      .addCase(fetchState.pending, (state) => {
        state.state = [];
        state.status = "loading";
      })
      .addCase(fetchState.fulfilled, (state, action) => {
        state.state = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchState.rejected, (state) => {
        state.state = [];
        state.status = "loading";
      })
      .addCase(fetchType.pending, (state) => {
        state.type = [];
        state.status = "loading";
      })
      .addCase(fetchType.fulfilled, (state, action) => {
        state.type = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchType.rejected, (state) => {
        state.type = [];
        state.status = "loading";
      });
  },
});

export const { setShowFilters } = filtersSlice.actions;
export default filtersSlice.reducer;

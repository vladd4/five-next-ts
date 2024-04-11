import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type User = {
  id: number
  name: string;
  phone: string | null;
  email: string;
  telegram: string | null;
  avatar: string | null;
}

type UpdateUser = {
  userId: number
  name?: string;
  phone?: string;
  telegram?: string 
}

type UserSlice = {
  user: User | null,
  status: 'loading' | "loaded"
}

export const fetchUser = createAsyncThunk<User, string>("users/fetchUser", async (email) => {
  const data = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/${email}`);
  return data.data;
});

export const updateUser = createAsyncThunk<User, UpdateUser>(
  "users/updateUser",
  async (params) => {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/user/edit/${params.userId}`,
      params
    );
    return data.data;
  }
);


const initialState: UserSlice = {
  user: null,
  status: "loading",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.user = null;
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.status = "loading";
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.status = "loaded";
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = "loading";
      });
  },
  
});

export default userSlice.reducer;

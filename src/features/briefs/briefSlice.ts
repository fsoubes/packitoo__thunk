import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CheckoutState } from "../../shared/api/constant";

export interface Brief {
  id: number;
  title: string;
  comment: string;
  productId: number;
}

export interface BriefState {
  brief: Brief;
  checkoutState: CheckoutState;
  errorMessage: string;
}

const initialState: BriefState = {
  brief: {} as Brief,
  checkoutState: "LOADING",
  errorMessage: "",
};

export const getBrief = createAsyncThunk("briefs", async (id: string) => {
  const response = await fetch(`http://localhost:4000/briefs/${id}`);
  return (await response.json()) as Brief;
});

const briefSlice = createSlice({
  name: "brief",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrief.pending, (state) => {
      state.checkoutState = "LOADING";
    });
    builder.addCase(getBrief.fulfilled, (state, action) => {
      state.checkoutState = "READY";
      state.brief = action.payload;
    });
    builder.addCase(getBrief.rejected, (state, action) => {
      state.checkoutState = "ERROR";
      state.errorMessage = action.error.message || "";
    });
  },
});

export default briefSlice.reducer;

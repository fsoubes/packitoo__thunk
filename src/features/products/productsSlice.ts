import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CheckoutState } from "../../shared/api/constant";

export interface Products {
  id: number;
  name: string;
}

export interface ProductsState {
  products: Products[];
  checkoutState: CheckoutState;
  errorMessage: string;
}

const initialState: ProductsState = {
  products: [],
  checkoutState: "LOADING",
  errorMessage: "",
};

export const getProducts = createAsyncThunk("products/get", async () => {
  const products = await fetch("http://localhost:4000/products");
  return (await products.json()) as Products[];
});

const productsSlice = createSlice({
  initialState,
  name: "products",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.checkoutState = "LOADING";
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.checkoutState = "READY";
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.checkoutState = "ERROR";
      state.errorMessage = action.error.message || "";
    });
  },
});

export default productsSlice.reducer;

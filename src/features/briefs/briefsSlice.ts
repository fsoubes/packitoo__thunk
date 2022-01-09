import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { CheckoutState } from "../../shared/api/constant";
import { RootState } from "../../shared/store";

export interface Brief {
  id: number;
  title: string;
  comment: string;
  productId: number;
}

export type BriefResponse = Brief[];


export interface BriefState {
  nodes: BriefResponse;
  checkoutState: CheckoutState;
  errorMessage: string;
}

const initialState: BriefState = {
  nodes: [],
  checkoutState: "LOADING",
  errorMessage: "",
};

export const getBriefs = createAsyncThunk("briefs/get", async () => {
  const response = await fetch("http://localhost:4000/briefs");
  return (await response.json()) as BriefResponse;
});


export const addBrief = createAsyncThunk(
  "briefs/add",
  async (payload: Brief) => {
    const resp = await fetch("http://localhost:4000/briefs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id:payload.id,
        title: payload.title,
        comment: payload.comment,
        productId: payload.productId,
      }),
    });

    if (resp.ok) {
      const brief = (await resp.json()) as Brief;
      return { brief };
    }
  }
);

const briefsSlice = createSlice({
  name: "brieves",
  initialState,
  reducers: {
    /*  addBrief: (state, action) => {
      const brief = {
        id: state.nodes[state.nodes.length - 1].id++,
        title: action.payload.title,
        comment: action.payload.comment,
        productId: action.payload.productId,
      };
      state.nodes.push(brief);
    }, */
  },
  extraReducers: (builder) => {
    builder.addCase(getBriefs.pending, (state) => {
      state.checkoutState = "LOADING";
    });
    builder.addCase(getBriefs.fulfilled, (state, action) => {
      state.checkoutState = "READY";
      state.nodes = action.payload;
    });
    builder.addCase(getBriefs.rejected, (state, action) => {
      state.checkoutState = "ERROR";
      state.errorMessage = action.error.message || "";
    });
    builder.addCase(addBrief.fulfilled, (state, action) => {
      state.nodes.push(action.payload?.brief as Brief);
    });
  },
});

// export const { addBrief } = briefsSlice.actions;
export default briefsSlice.reducer;


export const getBriefsByProductId = createSelector(
  (state :RootState) => state.briefs.nodes,
  (state:RootState, productId: string) => productId,
  (nodes , productId ) =>
    productId !== "" ? nodes.filter((node) => node.productId === parseInt(productId)+1) : nodes
)




import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import briefsReducer from "../features/briefs/briefsSlice";
import briefReducer from "../features/briefs/briefSlice";

const reducer = {
  products: productsReducer,
  briefs: briefsReducer,
  brief: briefReducer,
};

export const store = configureStore({ reducer });

export function getStoreWithState(preloadedState?: RootState) {
  return configureStore({ reducer, preloadedState });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

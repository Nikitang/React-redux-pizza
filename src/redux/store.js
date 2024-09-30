import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/filterSlice.js";

export const store = configureStore({
  reducer: { counter: counterReducer },
});

import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  devTools: true,
  reducer: {
    product: productSlice,
    cart: cartSlice,
  },
});

export default store;

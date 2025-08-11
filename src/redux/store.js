import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import authReducer from "./auth";

const store = configureStore({
  devTools: true,
  reducer: {
    product: productSlice,
    cart: cartSlice,
    auth: authReducer,
  },
});

export default store;

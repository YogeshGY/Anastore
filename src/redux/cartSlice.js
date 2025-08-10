import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addItemCart: (state, action) => {
      state.items.push(action.payload);
    },
    deleteItemCart: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity = item.quantity + 1;
      }
    },
    decrementQuantity: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItemCart,
  deleteItemCart,
  incrementQuantity,
  decrementQuantity,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;

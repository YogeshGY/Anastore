import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productApi = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get(productApi);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    loading: false,
    error: null,
    logedStatus: "",
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateCartdetails: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload ? { ...item, inCart: !item.inCart } : item
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.map((item) => ({
          ...item,
          inCart: false,
        }));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addProduct, deleteProduct, updateCartdetails } =
  productSlice.actions;

export default productSlice.reducer;

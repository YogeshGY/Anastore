import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productApi = "http://localhost:3000/products";
const addProductApi = "http://localhost:3000/addproduct";
const deleteProductApi = "http://localhost:3000/deleteproduct";
const updateProductApi = "http://localhost:3000/updateproduct";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get(productApi);
    return response.data;
  }
);

export const addProductAdmin = createAsyncThunk(
  "product/addProductAdmin",
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await axios.post(addProductApi, newProduct);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Network error or server not reachable");
      }
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ _id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${updateProductApi}/${_id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update product" }
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (_id) => {
    await axios.delete(`${deleteProductApi}/${_id}`);
    return _id;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {
    updateCartdetails: (state, action) => {
      state.items = state.items.map((item) =>
        item._id === action.payload ? { ...item, inCart: !item.inCart } : item
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
        state.items = action.payload.product;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProductAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductAdmin.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addProductAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {})
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateCartdetails } = productSlice.actions;

export default productSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      Cookies.set("isAuthenticated", "true", { expires: 1 });
    },
    logout: (state) => {
      state.isAuthenticated = false;
      Cookies.remove("isAuthenticated");
    },
  },
});

export const { login, logout } = authReducer.actions;
export default authReducer.reducer;

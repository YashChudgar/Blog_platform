// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { loginSuccess } from "./authSlice";

// Create the store
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Rehydrate user from localStorage (💡 key fix)
const savedUser = localStorage.getItem("user");
if (savedUser) {
  store.dispatch(loginSuccess(JSON.parse(savedUser)));
}

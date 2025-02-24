import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const storedToken = localStorage.getItem("authToken");

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      isAuthenticated: !!storedToken,
      token: storedToken || null,
      permissions: [],
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
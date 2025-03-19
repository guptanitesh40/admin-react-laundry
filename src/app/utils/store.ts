import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";

const storedToken = localStorage.getItem("authToken") || null;

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  preloadedState: {
    auth: {
      isAuthenticated: !!storedToken,
      token: storedToken,
      permissions: [],
      role_id: null,
    },
    user: {
      user_id: null,
      first_name: "",
      last_name: "",
      mobile_number: "",
      email: "",
      role: "",
      gender: null,
      role_id: null,
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

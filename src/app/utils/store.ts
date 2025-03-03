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
      isAuthenticated: !!storedToken ,
      token: storedToken, 
      permissions: [],
      role_id: null,
    },
    user: {
      id: null,
      name: "",
      email: "",
      role: "",
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
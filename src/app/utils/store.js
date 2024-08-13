import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const storedToken = localStorage.getItem('authToken');

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      isAuthenticated: !!storedToken,
      token: storedToken || null,
    }
  }
});

export default store;

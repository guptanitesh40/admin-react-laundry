import { createSlice } from "@reduxjs/toolkit";

const getInitialAuthState = () => {
  const storedToken = localStorage.getItem('authToken');
  return {
    isAuthenticated: !!storedToken,
    token: storedToken || null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token || null;
      if (action.payload.isAuthenticated) {
        localStorage.setItem('authToken', action.payload.token);
      } else {
        localStorage.removeItem('authToken');
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('authToken');
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

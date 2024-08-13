import { createSlice } from "@reduxjs/toolkit";

const getInitialAuthState = () => {
  const storedToken = localStorage.getItem('authToken');
  return {
    isAuthenticated: !!storedToken, 
    token: storedToken || null
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem('authToken', action.payload);
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

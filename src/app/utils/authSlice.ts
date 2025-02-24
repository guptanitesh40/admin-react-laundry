import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  permissions: string[]; 
}

const getInitialAuthState = (): AuthState => {
  const storedToken = localStorage.getItem('authToken');
  return {
    isAuthenticated: !!storedToken,
    token: storedToken || null,
    permissions: [],
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
      state.permissions = action.payload.permissions; 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.permissions = [];
      localStorage.removeItem('authToken');
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

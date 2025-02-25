import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  name: string;
  email: string;
  role: string;
}

const initialState: UserState = {
  id: null,
  name: "",
  email: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { addUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {  
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
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    removeUser: (state) => {
      state.id = null;
      state.name = "";
      state.email = "";
      state.role = "";
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
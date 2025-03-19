import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user_id: number | null;
  first_name: string;
  last_name: string;
  mobile_number: string;
  email: string;
  role: string;
  gender: boolean | null;
  role_id: number | null;
  image: string | any;
}

const initialState: UserState = {
  user_id: null,
  first_name: "",
  last_name: "",
  mobile_number: "",
  email: "",
  role: "",
  gender: null,
  role_id: null,
  image : "",
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

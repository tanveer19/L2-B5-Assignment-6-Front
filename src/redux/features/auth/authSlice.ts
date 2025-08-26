import { createSlice } from "@reduxjs/toolkit";

interface Wallet {
  balance: number;
}

interface IUserInfo {
  role: string;
  name: string;
  phone: string;
  wallet?: Wallet;
}

const initialState: { user: IUserInfo | null } = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

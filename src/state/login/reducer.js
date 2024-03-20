import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doItTogether } from "../../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

const initialState = {
  userSetUp: false,
  userAccountInfo: {},
  loggedInUser: {},
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    registerUser: (state, { payload }) => {
      if (!state.userSetUp) {
        state.userAccountInfo = payload;
        state.userSetUp = true;
      }
    },
    loginUser: (state, { payload }) => {
      state.loggedInUser = payload;
    },
  },
});

export const { registerUser, loginUser } = loginSlice.actions;

export default loginSlice.reducer;

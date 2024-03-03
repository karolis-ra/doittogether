import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doItTogether } from "../../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

const initialState = {
  userSetUp: false,
  userAccountInfo: {},
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    registerUser: (state, { payload }) => {
      if (!state.userSetUp) {
        console.log("email and pass registered");
        state.userAccountInfo = payload;
        state.userSetUp = true;
      }
    },
  },
});

export const { registerUser } = loginSlice.actions;

export default loginSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { doItTogether } from "../../firebase/clientApp";

const initialState = {
  event: {},
  user: "",
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    registerEvent: (state, { payload }) => {
      const eventsCol = collection(doItTogether, "events");
      addDoc(eventsCol, payload);
    },
  },
});

export const { registerEvent } = eventsSlice.actions;

export default eventsSlice.reducer;

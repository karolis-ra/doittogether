import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { doItTogether } from "../../firebase/clientApp";

const initialState = {
  event: {},
  user: "",
  showModal: false,
  doc_id: "",
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    registerEvent: (state, { payload }) => {
      const eventsCol = collection(doItTogether, "events");
      addDoc(eventsCol, payload);
    },
    openModal: (state, { payload }) => {
      state.showModal = true;
      state.doc_id = payload;
    },
    hideModal: (state) => {
      state.showModal = false;
    },
  },
});

export const { registerEvent, openModal, hideModal } = eventsSlice.actions;

export default eventsSlice.reducer;

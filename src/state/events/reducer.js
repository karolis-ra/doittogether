import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { doItTogether } from "../../firebase/clientApp";

const initialState = {
  event: {},
  user: "",
  showModal: false,
  doc_id: "",
  participant: {},
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    registerEvent: (state, { payload }) => {
      const eventsCol = collection(doItTogether, "events");
      addDoc(eventsCol, payload);
    },
    registerUser: (state, { payload }) => {
      const eventDocRef = doc(doItTogether, "events", payload.event_id);
      updateDoc(eventDocRef, {
        pending_users: arrayUnion(payload),
      });
    },
    confirmUser: (state, { payload }) => {
      const eventDocRef = doc(doItTogether, "events", payload.event_id);
      updateDoc(eventDocRef, {
        confirmed_users: arrayUnion(payload.confirmed_user),
      });
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

export const {
  registerEvent,
  openModal,
  hideModal,
  registerUser,
  confirmUser,
} = eventsSlice.actions;

export default eventsSlice.reducer;

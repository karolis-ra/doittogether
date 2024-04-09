import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    openModal: (state) => {
      state.showModal = true;
    },
    hideModal: (state) => {
      state.showModal = false;
    },
    toggleModal: (state) => {
      if (state.showModal === true) {
        state.showModal = false;
      }
      if (state.showModal === false) {
        state.showModal = true;
      }
    },
  },
});

export const { openModal, hideModal, toggleModal } = navigationSlice.actions;

export default navigationSlice.reducer;
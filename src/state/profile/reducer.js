import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doItTogether } from "../../firebase/clientApp";
import { getDoc, doc } from "firebase/firestore";

const initialState = {
  user: {},
  showInvitationModal: false,
  modal_id: "",
  confirmed: false,
};

export const fetchCurrentUser = createAsyncThunk(
  "data/fetchCurrentUser",
  async (user_id) => {
    try {
      const docRef = doc(doItTogether, "users", user_id);
      const docSnap = await getDoc(docRef); 

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      throw error; 
    }
  }
);

export const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    openInvitationModal: (state, { payload }) => {
      state.showInvitationModal = true;
      state.modal_id = payload;
    },
    hideInvitationModal: (state) => {
      state.showInvitationModal = false;
    },
    setConfirmed: (state) => {
      if (state.confirmed === true) {
        state.confirmed = false;
      } else {
        state.confirmed = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { openInvitationModal, hideInvitationModal, setConfirmed } =
  profile.actions;

export default profile.reducer;

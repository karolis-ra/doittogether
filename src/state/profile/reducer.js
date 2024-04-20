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
      const docRef = doc(doItTogether, "users", user_id); // Create a reference to the document
      const docSnap = await getDoc(docRef); // Fetch the document

      if (docSnap.exists()) {
        // Document exists, return its data
        return docSnap.data();
      } else {
        // Document doesn't exist
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      throw error; // Rethrow the error to handle it in the calling code
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

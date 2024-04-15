import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doItTogether } from "../../firebase/clientApp";
import { collection, getDoc, doc } from "firebase/firestore";

const initialState = {
  user: {},
};

export const fetchCurrentUser = createAsyncThunk(
  "data/fetchCurrentUser",
  async (user_id) => {
    let user = {};
    try {
      const docRef = doc(doItTogether, "users", user_id); // Create a reference to the document
      const docSnap = await getDoc(docRef); // Fetch the document

      if (docSnap.exists()) {
        // Document exists, return its data
        return docSnap.data();
      } else {
        // Document doesn't exist
        console.log("No such document!");
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
    // setCqIndex: (state, { payload }) => {
    //   const currentQ = state.cqIndex;
    //   state.cqIndex = currentQ + payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      console.log(payload);
    });
  },
});

export const {} = profile.actions;

export default profile.reducer;

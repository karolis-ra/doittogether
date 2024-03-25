import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doItTogether } from "../../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

const initialState = {
  questions: [],
  test: [],
};

export const fetchQuestions = createAsyncThunk("data/fetchData", async () => {
  const colRef = collection(doItTogether, "profile_form");
  let items = [];
  await getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      items = doc.data();
    });
  });
  return items;
});

export const profileForm = createSlice({
  name: "profileForm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, { payload }) => {
      console.log(payload.klausimai);
      state.questions = payload.klausimai;
    });
  },
});

export default profileForm.reducer;

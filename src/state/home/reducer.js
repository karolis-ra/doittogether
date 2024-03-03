import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doItTogether } from "../../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

const initialState = {
  testD: [],
};

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const colRef = collection(doItTogether, "test");
  let items = [];
  await getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id });
    });
  });
  return items;
});

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, { payload }) => {
      state.testD = payload;
    });
  },
});

export default homeSlice.reducer;

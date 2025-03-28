import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doItTogether } from "../../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

const initialState = {
  events: [],
};

export const fetchEvents = createAsyncThunk("data/fetchEvents", async () => {
  const colRef = collection(doItTogether, "events");
  let items = [];
  await getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      const currentObject = { ...doc.data(), document_id: doc.id };
      items.push(currentObject);
    });
  });
  console.log(items);
  return items;
});

export const home = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
      state.events = payload;
    });
  },
});

export const {} = home.actions;

export default home.reducer;

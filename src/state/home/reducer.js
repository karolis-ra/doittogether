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
      items.push(doc.data());
    });
  });
  console.log("fetchEvents", items);
  return items;
});

export const home = createSlice({
  name: "home",
  initialState,
  reducers: {
    // setCqIndex: (state, { payload }) => {
    //   const currentQ = state.cqIndex;
    //   state.cqIndex = currentQ + payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
      state.events = payload;
    });
  },
});

export const {} = home.actions;

export default home.reducer;

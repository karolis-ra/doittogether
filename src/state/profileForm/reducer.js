import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doItTogether } from "../../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

const initialState = {
  questions: [],
  test: [],
  userInfo: {
    id: "",
    name: "",
    gender: "",
    city: "",
    age: "",
    activities: {},
  },
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
  reducers: {
    setUserActivities: (state, { payload }) => {
      const { discipline, title, value } = payload;
      const userInfo = state.userInfo;
      const activities = { ...userInfo.activities };

      if (activities[discipline]) {
        userInfo.activities[discipline][title] = value;
      } else {
        userInfo.activities[discipline] = { [title]: value };
      }
    },
    setUserGender: (state, { payload }) => {
      const userInfo = state.userInfo;
      userInfo.gender = payload;
    },
    setUserAgeCity: (state, { payload }) => {
      const userInfo = state.userInfo;
      const { value, title } = payload;
      if (title === "Amžius") {
        userInfo.age = value;
      } else {
        userInfo.city = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, { payload }) => {
      console.log(payload.klausimai);
      state.questions = payload.klausimai;
    });
  },
});

export const { setUserActivities, setUserGender, setUserAgeCity } =
  profileForm.actions;

export default profileForm.reducer;

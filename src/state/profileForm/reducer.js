import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doItTogether } from "../../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

const initialState = {
  questions: [],
  test: [],
  cqIndex: 0,
  quizSkipped: false,
  quizDone: false,
  userInfo: {
    id: "",
    name: "",
    email: "",
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
    setUserPersonalInfo: (state, { payload }) => {
      const { ID, name, email } = payload;
      state.id = ID;
      if (name) {
        state.name = name;
      } else {
        state.name = email;
      }
      state.email = email;
    },
    setCqIndex: (state, { payload }) => {
      console.log("hello", payload);
      const currentQ = state.cqIndex;
      state.cqIndex = currentQ + payload;
    },
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
    setQuizDone: (state, { payload }) => {
      state.quizDone = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, { payload }) => {
      console.log(payload.klausimai);
      state.questions = payload.klausimai;
    });
  },
});

export const {
  setUserActivities,
  setUserGender,
  setUserAgeCity,
  setCqIndex,
  setQuizDone,
  setUserPersonalInfo,
} = profileForm.actions;

export default profileForm.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doItTogether } from "../../firebase/clientApp";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const initialState = {
  questions: [],
  test: [],
  cqIndex: 0,
  reDo: false,
  userInfo: {
    id: "",
    name: "",
    email: "",
    gender: "",
    city: "",
    age: "",
    activities: {},
    quizDone: false,
    quizSkipped: false,
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

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (userId, { rejectWithValue }) => {
    console.log("user fetched");
    try {
      const userDocRef = doc(doItTogether, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        return userDocSnap.data();
      } else {
        return rejectWithValue("User not found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const profileForm = createSlice({
  name: "profileForm",
  initialState,
  reducers: {
    setUserPersonalInfo: (state, { payload }) => {
      const { ID, name, email } = payload;
      const userInfo = state.userInfo;
      userInfo.id = ID;

      if (name) {
        userInfo.name = name;
      }
      userInfo.email = email;
      userInfo.quizDone = true;
      setDoc(doc(doItTogether, "users", ID), state.userInfo);
    },
    setCqIndex: (state, { payload }) => {
      const currentQ = state.cqIndex;
      state.cqIndex = currentQ + payload;
    },
    setUserActivities: (state, { payload }) => {
      const { discipline, title, value } = payload;
      state.userInfo.activities = state.userInfo.activities || {};
      if (state.userInfo.activities[discipline]) {
        state.userInfo.activities[discipline][title] = value;
      } else {
        state.userInfo.activities[discipline] = { [title]: value };
      }
    },
    setUserGender: (state, { payload }) => {
      const userInfo = state.userInfo;
      userInfo.gender = payload;
    },
    setUserAgeCity: (state, { payload }) => {
      const userInfo = state.userInfo;
      const { value, title } = payload;
      console.log("this is vardas", payload);
      if (title === "Amžius") {
        userInfo.age = value;
      }
      if (title === "Vardas") {
        userInfo.name = value;
        console.log(userInfo);
      } else {
        userInfo.city = value;
      }
    },
    setQuizSkipped: (state, { payload }) => {
      state.userInfo.quizSkipped = payload;
    },
    setQuizNotDone: (state, { payload }) => {
      state.userInfo.activities = {};
      state.userInfo.quizDone = payload;
      state.cqIndex = 0;
      state.reDo = true;
    },
    setQuizDone: (state, { payload }) => {
      state.userInfo.quizDone = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, { payload }) => {
      state.questions = payload.klausimai;
    });
    builder
      // .addCase(fetchUser.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        // state.loading = false;
        // state.user = payload;
        state.userInfo = payload;
        // state.error = null;
      })
      .addCase(fetchUser.rejected, (state, { payload }) => {
        console.log("user not found");
      });
  },
});

export const {
  setUserActivities,
  setUserGender,
  setUserAgeCity,
  setCqIndex,
  setQuizSkipped,
  setUserPersonalInfo,
  setQuizDone,
  setQuizNotDone,
} = profileForm.actions;

export default profileForm.reducer;

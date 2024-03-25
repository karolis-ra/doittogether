import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login/reducer";
import profileFormReducer from "./profileForm/reducer";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    profileForm: profileFormReducer,
  },
});

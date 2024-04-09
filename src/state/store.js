import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login/reducer";
import profileFormReducer from "./profileForm/reducer";
import eventsReducer from "./events/reducer";
import navigationReducer from "./navigation/reducer";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    profileForm: profileFormReducer,
    events: eventsReducer,
    navigation: navigationReducer,
  },
});

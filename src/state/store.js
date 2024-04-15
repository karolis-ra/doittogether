import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login/reducer";
import profileFormReducer from "./profileForm/reducer";
import eventsReducer from "./events/reducer";
import navigationReducer from "./navigation/reducer";
import homeReducer from "./home/reducer";
import profileReducer from "./profile/reducer";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    profileForm: profileFormReducer,
    events: eventsReducer,
    navigation: navigationReducer,
    home: homeReducer,
    profile: profileReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./home/reducer";
import loginReducer from "./login/reducer";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    login: loginReducer,
  },
});

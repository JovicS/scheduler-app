import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./redux/snackbar/snackbarSlice";
import drawerReducer from "./redux/drawer/drawerSlice";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    drawer: drawerReducer,
  },
});

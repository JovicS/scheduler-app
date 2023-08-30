import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  closed: false,
  auto: false,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    show: (state, action) => {
      state.closed = false;
      state.auto = action.payload;
    },
    close: (state, action) => {
      state.closed = true;
      state.auto = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { show, close, check } = drawerSlice.actions;

export default drawerSlice.reducer;

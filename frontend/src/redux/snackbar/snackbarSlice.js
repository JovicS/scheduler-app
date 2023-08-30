import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  show: false,
  text: '',
  alert: ''
}

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    show: (state, action) => {
      state.show = true;
      state.text = action.payload.text;
      state.alert = action.payload.alert

    },
    close: () => {
      return {...initialState}
    },
  },
})

// Action creators are generated for each case reducer function
export const { show, close } = snackbarSlice.actions

export default snackbarSlice.reducer
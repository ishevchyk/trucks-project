import {createSlice} from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isShown: false,
    // notification: null
  },
  reducers: {
    toggle(state) {
      state.isShown = !state.isShown
    }
  }
})
export const uiActions = uiSlice.actions

export default uiSlice

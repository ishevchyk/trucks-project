import {createSlice} from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: false,
  token: null,
  user: {}
}

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
    },
    retrieveToken (state, action) {
      state.token = action.payload
      state.isLoggedIn = true
    },
    getUser(state, action) {
      state.user = action.payload
    }

  }
})

export const authActions = authSlice.actions;

export default authSlice

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { name: null, email: null, id: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user.name = payload.user.name;
      state.user.email = payload.user.email;
      state.user.avatar = payload.user.avatar;
      state.user.id = payload.user.id;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    logout: (state, { payload }) => {
      state.user.name = null;
      state.user.email = null;
      state.user.avatar = null;
      state.user.id = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    refresh: (state, action) => {
      state.user = { ...action.payload };
      state.isLoggedIn = true;
    },
  },
});

export const { register, login, logout, refresh } = authSlice.actions;
export default authSlice.reducer;

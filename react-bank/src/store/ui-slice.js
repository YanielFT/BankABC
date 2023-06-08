import { createSlice } from "@reduxjs/toolkit";

const initialState = { isShow: false, notification: null };
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isShow = !state.isShow;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    hiddenNotification(state){
      state.notification = null;
    }
  },
});

const uiReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;
export default uiReducer;

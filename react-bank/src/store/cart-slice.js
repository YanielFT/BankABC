import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: []};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setData(state, action) {
      state.items = action.payload;
      console.log(state.items)
    },
  },
});

const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
export default cartReducer;

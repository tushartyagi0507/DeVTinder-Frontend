import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    updateFeed: (state, action) => {
      const newArray = state.filter((f) => f._id != action.payload);
      return newArray;
    },
  },
});

export const { addFeed, updateFeed } = feedSlice.actions;
export default feedSlice.reducer;

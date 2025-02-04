import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: function (state, action) {
      return action.payload;
    },
    removeUser: function () {
      return null;
    },
  },
});

export const { addUser, reducer } = userSlice.actions;
export default userSlice.reducer;

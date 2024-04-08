import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRoom: undefined,
};

const currentRoomSlice = createSlice({
  name: "currentRoom",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      return {
        ...state,
        currentRoom: action.payload,
      };
    },
  },
});

export const { setRoom } = currentRoomSlice.actions;
export default currentRoomSlice.reducer;

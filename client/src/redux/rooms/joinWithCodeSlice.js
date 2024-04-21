import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomname: null,
    joinedRoom: false,
};

const joinRoomWithSlice = createSlice({
    name: "joinRoom",
    initialState,
    reducers: {
        initialRoom: (state) => {
            (state.roomname = "Lobby"), (state.joinedRoom = false)
        },
        joinedwithcode: (state, action) => {
            (state.roomname = action.payload), (state.joinedRoom = true)
        },
        joinedroomError: (state, action) => {
            (state.roomname = action.payload), (state.joinedRoom = false)
        },
    },
});

export const { initialRoom, joinedwithcode, joinedroomError } = joinRoomWithSlice.actions;
export default joinRoomWithSlice.reducer;
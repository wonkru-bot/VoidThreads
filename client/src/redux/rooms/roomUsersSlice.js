import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentRoomUsers: [],
};

const currentRoomUserListSlice = createSlice({
    name: "currentRoomUsers",
    initialState,
    reducers: {
        setUsersList: (state, action) => {
            return {
                ...state,
                currentRoomUsers: action.payload,
            };
        },
    },
});

export const { setUsersList } = currentRoomUserListSlice.actions;
export default currentRoomUserListSlice.reducer;

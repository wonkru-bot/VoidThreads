import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedTheme: null,
};

const ThemeSlice = createSlice({
    name: "ThemeSelector",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            (state.selectedTheme = action.payload)
        }
    },
});

export const { setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer; 
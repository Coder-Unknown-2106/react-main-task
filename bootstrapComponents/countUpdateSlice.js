import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
}

export const countUpdateSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        updateLocalStorage: (state) => {

        }
    }
});

export const { updateLocalStorage } = countUpdateSlice.actions;

export default countUpdateSlice.reducer;
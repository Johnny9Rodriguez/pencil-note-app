import { createSlice } from "@reduxjs/toolkit";

export const selectionSlice = createSlice({
    name: 'selection',
    initialState: {
        showSelection: false
    },
    reducers: {
        toggleShowSelection: (state) => {
            state.showSelection = !state.showSelection;
        }
    }
})

export const { toggleShowSelection } = selectionSlice.actions;

export default selectionSlice.reducer;
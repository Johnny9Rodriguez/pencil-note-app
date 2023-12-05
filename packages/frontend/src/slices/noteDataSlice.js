import { createSlice } from '@reduxjs/toolkit';

export const noteDataSlice = createSlice({
    name: 'noteData',
    initialState: {
        notes: []
    },
    reducers: {
        add: (state, action) => {},
        remove: (state, action) => {},
        update: (state, action) => {}
    }
});

export const { add, remove, update } = noteDataSlice.actions;

export default noteDataSlice.reducer;
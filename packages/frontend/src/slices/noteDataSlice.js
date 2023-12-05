import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const noteDataSlice = createSlice({
    name: 'noteData',
    initialState: {
        noteIds: new Set('1234', '5678'),
        notes: [
            { id: '1234', title: 'Great idea!', content: 'Make a million dollars.'},
            { id: '5678', title: 'Another idea', content: 'Make 2 million dollars.'}
        ],
        selectedNote: '5678'
    },
    reducers: {
        add: (state, action) => {
            let id = nanoid(4);
            while (state.noteIds.has(id)) {
                id = nanoid(4);
            }
            state.noteIds.add(id);
        },
        remove: (state, action) => {},
        update: (state, action) => {},
        select: (state, action) => {

        }
    }
});

export const { add, remove, update, select } = noteDataSlice.actions;

export default noteDataSlice.reducer;
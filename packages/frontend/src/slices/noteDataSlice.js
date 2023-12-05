import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const noteDataSlice = createSlice({
    name: 'noteData',
    initialState: {
        noteIds: ['1234', '5678'],
        notes: [
            { id: '1234', title: 'Great idea!', content: 'Make a million dollars.' },
            { id: '5678', title: 'Another idea', content: 'Make 2 million dollars.' }
        ],
        selectedNote: { id: '5678', title: 'Another idea', content: 'Make 2 million dollars.' }
    },
    reducers: {
        add: (state, action) => {
            let id = nanoid(4);
            while (state.noteIds.includes(id)) {
                id = nanoid(4);
            }
            state.noteIds.push(id);
        },
        remove: (state, action) => { },
        update: (state, action) => {
            const { id, title, content } = action.payload;
            const note = state.notes.find(note => note.id === id);

            if (note) {
                // Update note state
                note.title = title;
                note.content = content;
                
                // Update selected note
                state.selectedNote = { ...state.selectedNote, title, content };
            } else {
                throw new Error('Invalid note index. Cannot update note state.');
            }
        },
        select: (state, action) => {
            state.selectedNote = action.payload;
        }
    }
});

export const { add, remove, update, select } = noteDataSlice.actions;

export default noteDataSlice.reducer;
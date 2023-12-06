import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const noteDataSlice = createSlice({
    name: 'noteData',
    initialState: {
        noteIds: [],
        notes: [],
        selectedNote: {}
    },
    reducers: {
        add: (state) => {
            let id = nanoid(4);
            while (state.noteIds.includes(id)) {
                id = nanoid(4);
            }

            const newNote = { id: id, title: '', content: '' };

            state.noteIds.push(id);
            state.notes.push(newNote);
            state.selectedNote = newNote;
        },
        remove: (state, action) => { 
            const id = action.payload;

            state.notes = state.notes.filter(note => note.id !== id);

            if (state.selectedNote.id === id) {
                if (state.notes.length === 0) {
                    state.selectedNote = {};
                } else {
                    state.selectedNote = state.notes[0];
                }
            }
        },
        update: (state, action) => {
            const { id, title, content } = action.payload;

            if (state.selectedNote.id === id) {
                const note = state.notes.find(note => note.id === id);

                if (note) {
                    // Update note state
                    note.title = title;
                    note.content = content;

                    // Update selected note
                    state.selectedNote = { ...state.selectedNote, title, content };
                }
            }

        },
        select: (state, action) => {
            state.selectedNote = action.payload;
        }
    }
});

export const { add, remove, update, select } = noteDataSlice.actions;

export default noteDataSlice.reducer;
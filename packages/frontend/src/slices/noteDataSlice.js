import { createSlice } from '@reduxjs/toolkit';

export const noteDataSlice = createSlice({
    name: 'noteData',
    initialState: {
        notes: [],
        selectedNote: {}
    },
    reducers: {
        add: (state, action) => {
            const noteId = action.payload.noteId;

            const newNote = { id: noteId, title: '', content: '' };

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
        },
        init: (state) => {
            state.notes = [];
            state.selectedNote = {};
        }
    }
})

export const { add, remove, update, select, init } = noteDataSlice.actions;

export default noteDataSlice.reducer;
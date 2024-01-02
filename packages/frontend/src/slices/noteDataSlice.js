import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const storeLocally = (state, userNotes) => {
    localStorage.setItem('userNotes', JSON.stringify(userNotes));
    localStorage.setItem('lastUpdated', Date.now());

    state.isModifiedSinceLastSync = true;
};

export const noteDataSlice = createSlice({
    name: 'noteData',
    initialState: {
        userNotes: [],
        selectedNote: {},
        isModifiedSinceLastSync: false,
    },
    reducers: {
        add: (state) => {
            const noteId = uuidv4();

            const newNote = { noteId, title: '', content: '' };

            const updatedUserNotes = [...state.userNotes, newNote];

            state.userNotes = updatedUserNotes;
            state.selectedNote = newNote;

            storeLocally(state, updatedUserNotes);
        },
        remove: (state, action) => {
            const noteId = action.payload;

            const updatedUserNotes = state.userNotes.filter(
                (note) => note.noteId !== noteId
            );

            state.userNotes = updatedUserNotes;

            if (state.selectedNote.noteId === noteId) {
                if (state.userNotes.length === 0) {
                    state.selectedNote = {};
                } else {
                    state.selectedNote = state.userNotes[0];
                }
            }

            storeLocally(state, updatedUserNotes);
        },
        update: (state, action) => {
            const { noteId, title, content } = action.payload;

            if (state.selectedNote.noteId === noteId) {
                const note = state.userNotes.find(
                    (note) => note.noteId === noteId
                );

                if (note) {
                    // Update note state
                    note.title = title;
                    note.content = content;

                    // Update selected note
                    state.selectedNote = {
                        ...state.selectedNote,
                        title,
                        content,
                    };
                }
            }

            const updatedUserNotes = state.userNotes;

            storeLocally(state, updatedUserNotes);
        },
        select: (state, action) => {
            state.selectedNote = action.payload;
        },
        init: (state) => {
            // Invoked on logout, i.e. do not update local storage / delete userNotes from it.
            state.userNotes = [];
            state.selectedNote = {};
        },
        setNotes: (state, action) => {
            const fetchedNotes = action.payload;
            if (fetchedNotes.length > 0) {
                state.userNotes = fetchedNotes;
                state.selectedNote = state.userNotes[0];
            }
        },
        resetIsModifiedSinceLastSync: (state) => {
            state.isModifiedSinceLastSync = false;
        },
    },
});

export const {
    add,
    remove,
    update,
    select,
    init,
    setNotes,
    resetIsModifiedSinceLastSync,
} = noteDataSlice.actions;

export default noteDataSlice.reducer;

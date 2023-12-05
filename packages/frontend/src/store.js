import { configureStore } from '@reduxjs/toolkit';
import noteDataReducer from './slices/noteDataSlice'

export default configureStore({
    reducer: {
        noteData: noteDataReducer
    }
});
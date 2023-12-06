import { configureStore } from '@reduxjs/toolkit';
import noteDataReducer from './slices/noteDataSlice'
import modalReducer from './slices/modalSlice'

export default configureStore({
    reducer: {
        noteData: noteDataReducer,
        modal: modalReducer
    }
});
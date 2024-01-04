import { configureStore } from '@reduxjs/toolkit';
import noteDataReducer from './slices/noteDataSlice';
import modalReducer from './slices/modalSlice';
import authReducer from './slices/authSlice';
import selectionReducer from './slices/selectionSlice';

export default configureStore({
    reducer: {
        noteData: noteDataReducer,
        modal: modalReducer,
        auth: authReducer,
        selection: selectionReducer,
    }
});
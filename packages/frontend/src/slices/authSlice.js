import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authenticated: null,
    },
    reducers: {
        setAuth: (state, action) => {
            state.authenticated = action.payload;
        }
    }
})

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
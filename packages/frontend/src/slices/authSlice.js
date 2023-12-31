import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authenticated: false,
        user: null
    },
    reducers: {
        setAuth: (state, action) => {
            state.authenticated = action.payload;
        },
        setUser: (state, action) => {
            const { userId, username } = action.payload;
            state.user = { userId, username };
        }
    }
})

export const { setAuth, setUser } = authSlice.actions;

export default authSlice.reducer;
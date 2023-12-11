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
            const { id, username } = action.payload;
            state.user = { id: id, username: username };
        }
    }
})

export const { setAuth, setUser } = authSlice.actions;

export default authSlice.reducer;
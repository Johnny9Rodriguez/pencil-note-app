import { createSlice } from "@reduxjs/toolkit";

export const modalTypes = {
    'DelAcc' : 'DeleteAccount',
    'Contact' : 'Contact',
    'None' : 'None'
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modalType: modalTypes.None
    },
    reducers: {
        setModal: (state, action) => {
            state.modalType = action.payload;
        }
    }
})

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    activeModal: null,
    modalProps: {},
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.activeModal = action.payload.modalName;
            state.modalProps = action.payload.modalProps || {};
        },
        closeModal: (state) => {
            state.activeModal = null;
            state.modalProps = {};
        },
    },
});

const {actions, reducer} = modalSlice;

export default reducer;
export const {openModal, closeModal} = actions;
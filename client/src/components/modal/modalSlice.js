/**
 * Redux Slice for managing modals.
 *
 * Defines the state and actions for opening and closing modals.
 */
import { createSlice } from '@reduxjs/toolkit';

// Initial state of the modal slice
const initialState = {
    activeModal: null,
    modalProps: {},
};

// Create a Redux slice for modal management
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        /**
         * Opens a modal with a given name and optional properties.
         */
        openModal: (state, action) => {
            state.activeModal = action.payload.modalName;
            state.modalProps = action.payload.modalProps || {};
        },

        /**
         * Closes the currently active modal.
         */
        closeModal: (state) => {
            state.activeModal = null;
            state.modalProps = {};
        },
    },
});

const { actions, reducer } = modalSlice;

export default reducer;
export const { openModal, closeModal } = actions;
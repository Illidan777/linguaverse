// Redux Toolkit
import {createSlice} from '@reduxjs/toolkit';

/**
 * Initial state for the practice slice.
 * The state keeps track of whether the practice has been finished or not.
 */
const initialState = {
    finished: false,
};

/**
 * Practice slice for managing the practice state.
 * This slice contains actions and reducers related to the practice functionality.
 */
const practiceSlice = createSlice({
    name: 'practice',
    initialState,
    reducers: {
        /**
         * Toggles the 'finished' state.
         * When this action is dispatched, it inverts the 'finished' state value.
         */
        toggleFinishedPractice: (state) => {
            state.finished = !state.finished;
        },
    },
});

// Extracting actions and the reducer from the slice
const { actions, reducer } = practiceSlice;

// Exporting the reducer to be used in the store
export default reducer;

// Exporting the action for toggling the 'finished' state
export const { toggleFinishedPractice } = actions;
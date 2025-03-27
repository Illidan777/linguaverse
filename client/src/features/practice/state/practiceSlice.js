import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    finished: false,
};

const practiceSlice = createSlice({
    name: 'practice',
    initialState,
    reducers: {
        toggleFinishedPractice: (state) => {
            state.finished = !state.finished;
        },
    },
});

const {actions, reducer} = practiceSlice;

export default reducer;
export const {toggleFinishedPractice} = actions;
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    openedNavbar: false,
}

const navbarSlice = createSlice({
        name: "navbar",
        initialState,
        reducers: {
            toggleNavbar: (state) => {
                state.openedNavbar = !state.openedNavbar;
            }
        },
    }
)

const {actions, reducer} = navbarSlice;

export default reducer;

export const {
    toggleNavbar,
} = actions
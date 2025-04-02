/**
 * Redux slice for managing the state of the navbar (whether it's open or closed).
 * Uses @reduxjs/toolkit to create the slice, reducers, and actions.
 */

import {createSlice} from "@reduxjs/toolkit";

// Initial state for the navbar: 'openedNavbar' is false by default (navbar is closed).
const initialState = {
    openedNavbar: false,
}

// Create the slice for navbar state management.
const navbarSlice = createSlice({
        name: "navbar",
        initialState,
        reducers: {
            /**
             * toggleNavbar reducer: Toggles the 'openedNavbar' state between true and false.
             * This is used to open/close the sidebar.
             */
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
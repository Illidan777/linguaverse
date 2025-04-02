/**
 * Redux Store Setup
 *
 * This file is responsible for configuring the Redux store by combining reducers,
 * setting up middlewares, and enabling development tools based on the environment.
 * It also includes API integration using Redux Toolkit's createSlice and coreApi for managing
 * asynchronous requests and state updates.
 *
 * @file store.js
 */

// Importing necessary functions from Redux Toolkit
import {combineReducers, configureStore} from "@reduxjs/toolkit";

// Importing the coreApi for managing asynchronous requests and API state
import {coreApi} from "../api";

// Importing slices for managing different sections of the app state
import modalSlice from "../components/modal/modalSlice";
import navbarSlice from "../features/page/layout/navbar/state/navbarSlice";
import practiceSlice from "../features/practice/state/practiceSlice";

/**
 * Root reducer combining all individual slices and the API reducer
 * This helps in managing the overall state structure.
 */
const rootReducer = combineReducers({
    navbar: navbarSlice,           // Handles the navbar-related state
    modal: modalSlice,             // Handles the modal visibility and settings
    practice: practiceSlice,       // Handles the practice-related state
    [coreApi.reducerPath]: coreApi.reducer,  // API state management for async actions
});

/**
 * Configuring the Redux store with rootReducer and middleware.
 * - The coreApi middleware is added to handle API calls.
 * - Redux DevTools are enabled for non-production environments for debugging.
 */
const store = configureStore({
    reducer: rootReducer,  // The combined reducers
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(coreApi.middleware), // Add API middleware to handle async actions
    devTools: process.env.NODE_ENV !== 'production' // Enable Redux DevTools in development mode
});

// Exporting the store as the default export to be used throughout the app
export default store;
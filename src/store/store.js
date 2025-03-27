import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {coreApi} from "../api";

import modalSlice from "../components/modal/modalSlice";
import navbarSlice from "../components/layout/page/navbar/state/navbarSlice";

import practiceSlice from "../features/practice/state/practiceSlice";

const rootReducer = combineReducers({
    navbar: navbarSlice,
    modal: modalSlice,
    practice: practiceSlice,
    [coreApi.reducerPath]: coreApi.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
        coreApi.middleware
    ),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store
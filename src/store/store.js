import {configureStore} from "@reduxjs/toolkit";
import navbarSlice from "../features/navbar/navbarSlice";
import rootReducer from "../reducer";

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
})


export default store
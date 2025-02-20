import {combineReducers} from "@reduxjs/toolkit";
import navbarSlice from "../features/navbar/navbarSlice";

const rootReducer = combineReducers({
    navbar: navbarSlice,
});

export default rootReducer;
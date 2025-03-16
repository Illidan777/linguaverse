import {combineReducers} from "@reduxjs/toolkit";
import navbarSlice from "../components/layout/page/navbar/navbarSlice";

const rootReducer = combineReducers({
    navbar: navbarSlice,
});

export default rootReducer;
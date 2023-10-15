import { combineReducers } from "@reduxjs/toolkit";
import {menu} from "./menu";

const createReducer = combineReducers({
    menu,
});

export default createReducer;
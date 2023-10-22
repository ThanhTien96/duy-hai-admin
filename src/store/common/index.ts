import { combineReducers } from "@reduxjs/toolkit";
import menu from "./menu";
import product from './product';
import auth from './auth';

const createReducer = combineReducers({
    menu,
    product,
    auth
});

export default createReducer;
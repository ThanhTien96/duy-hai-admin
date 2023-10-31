import { combineReducers } from "@reduxjs/toolkit";
import menu from "./menu";
import product from './product';
import auth from './auth';
import news from './news';

const createReducer = combineReducers({
    menu,
    product,
    auth,
    news,
});

export default createReducer;
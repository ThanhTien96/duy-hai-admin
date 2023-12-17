import { combineReducers } from "@reduxjs/toolkit";
import menu from "./menu";
import product from './product';
import auth from './auth';
import news from './news';
import blog from "./blog";

const createReducer = combineReducers({
    menu,
    product,
    auth,
    news,
    blog,
});

export default createReducer;
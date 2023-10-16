import { combineReducers } from "@reduxjs/toolkit";
import {menu} from "./menu";
import {product} from './product';

const createReducer = combineReducers({
    menu,
    product
});

export default createReducer;
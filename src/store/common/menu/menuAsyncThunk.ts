import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoriesService } from "services";
import MenuService from "services/menuRequester";

// fetch menu
export const thunkFetchMenu = createAsyncThunk(
  "menuSlice/fetchMenu",
  async (_, { signal }) => {
    const res = await MenuService.fetchMenu(signal);
    return res.data.data;
  }
);

// fetch categories list
export const thunkFetMainCategories = createAsyncThunk(
  "menuSlice/fetchMainCategories",
  async (_, { signal }) => {
    const res = await CategoriesService.fetchAllMainCategories(signal);
    return res.data.data;
  }
);

// fetch sub categories
export const thunkFetchSubCategories = createAsyncThunk(
  "menuSlice/fetchSubCategories",
  async (signal: AbortSignal) => {
    const res = await CategoriesService.getAllSubCategories(signal);
    return res.data.data;
  }
);

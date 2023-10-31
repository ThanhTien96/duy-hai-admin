import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostService } from "services";


// fetch all
export const thunkFetchAllNews = createAsyncThunk(
    'newsSlice/fetchAllNews',
    async ({page, perPage, keyWord}: {page: number, perPage?: number, keyWord?: string}, thunkApi) => {
        const res = await PostService.fetchAllNews(page, perPage, keyWord, thunkApi.signal);
        return res.data;
    }
)

export const thunkFetchNewsType = createAsyncThunk(
    'newsSlice/fetchNewsType',
    async (_, thunkApi) => {
        const res = await PostService.getAllNewsType(thunkApi.signal);
        return res.data.data
    }
)
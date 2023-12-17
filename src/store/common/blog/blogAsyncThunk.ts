import { createAsyncThunk } from "@reduxjs/toolkit";
import { BlogRequester } from "services";



// thunk fetch all support post
export const thunkFetchAllSupportPost = createAsyncThunk(
    "fetchAllSupportPost",
    async (_,thunkApi) => {
     const res = await BlogRequester.fetchAllSupportPost(thunkApi.signal);

     return res.data.data
    }
)

// thunk fetch  support post detail
export const thunkFetchSupportPostDetail = createAsyncThunk(
    "fetchSupportPostDetail",
    async (id: string,thunkApi) => {
     const res = await BlogRequester.fetchSupportPostDetail(id, thunkApi.signal);
     return res.data.data
    }
)

// fix post
// fetch all fix post 
export const thunkFetchAllFixPost = createAsyncThunk(
    "fetchAllFixPost",
    async (_, thunkApi) => {
        const res = await BlogRequester.fetchAllFixPost(thunkApi.signal);
        return res.data.data
    }
)

// fetch fix post detail
export const thunkFetchFixPostDetail = createAsyncThunk(
    "fetchFixPostDetail",
    async (id: string, thunkApi) => {
        const res = await BlogRequester.fetchFixPostDetail(id, thunkApi.signal);
        return res.data.data
    }
)



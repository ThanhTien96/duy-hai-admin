import { createSlice } from "@reduxjs/toolkit";
import { INewsPostFromBE, INewsTypeFormBE } from "types/Post";
import { IProductPagination } from "types/Product";
import { thunkFetchAllNews, thunkFetchNewsType } from "./newsAsyncThunk";



export interface INewsSLice {
    newsList: INewsPostFromBE[];
    pagination?: IProductPagination;
    pageLoading: boolean;
    newsType: INewsTypeFormBE[];
}


const initialState: INewsSLice = {
    newsList: [],
    pagination: undefined,
    pageLoading: false,
    newsType: []
}

const newsSlice = createSlice({
    name: 'newsSlice',
    initialState,
    reducers: {
        setNewsLoading: (state, action) => {
            state.pageLoading = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(thunkFetchAllNews.pending, (state) => {
            state.pageLoading = true
        });
        builder.addCase(thunkFetchAllNews.fulfilled, (state, {payload}) => {
            state.newsList = payload.data;
            state.pagination = {currentPage: payload.currentPage, totalPages: payload.totalPage, total: payload.total}
            state.pageLoading = false
        });
        builder.addCase(thunkFetchAllNews.rejected, (state) => {
            state.pageLoading = false;
        })
        builder.addCase(thunkFetchNewsType.pending, (state) => {
            state.pageLoading = true
        });
        builder.addCase(thunkFetchNewsType.fulfilled, (state, {payload}) => {
            state.newsType = payload;
            state.pageLoading = false
        });
        builder.addCase(thunkFetchNewsType.rejected, (state) => {
            state.pageLoading = false;
        })
    }
});

export const {
    setNewsLoading
} = newsSlice.actions;

export default newsSlice.reducer;
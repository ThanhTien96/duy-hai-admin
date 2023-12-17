import { createSlice } from "@reduxjs/toolkit";
import { thunkFetchAllFixPost, thunkFetchAllSupportPost, thunkFetchFixPostDetail, thunkFetchSupportPostDetail } from "./blogAsyncThunk";
import { IFixPost, ISupportPost } from "types/Blog";


export interface IBlogSlice {
    supportPostList: ISupportPost[];
    supportPost?: ISupportPost ;
    fixPostList: IFixPost[];
    fixPost?: IFixPost;
    loading: boolean;
}


const initialState: IBlogSlice = {
    supportPostList: [],
    supportPost: undefined,
    fixPostList: [],
    fixPost: undefined,
    loading: false,
};

const blogSlice = createSlice({
    name: "blogSlice",
    initialState,
    reducers: {
        setBlogLoading: (state, {payload}) => {
            state.loading = payload;
        },
        resetSupportPost: (state) => {
            state.supportPost = undefined;
        },
        resetFixPost: (state) => {
            state.fixPost = undefined;
        }
    },
    extraReducers: builder => {
        builder.addCase(thunkFetchAllSupportPost.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(thunkFetchAllSupportPost.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.supportPostList = payload;
        });
        builder.addCase(thunkFetchAllSupportPost.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(thunkFetchSupportPostDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(thunkFetchSupportPostDetail.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.supportPost = payload
        });
        builder.addCase(thunkFetchSupportPostDetail.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(thunkFetchAllFixPost.pending, (state) => {
            state.loading = true
        });
        builder.addCase(thunkFetchAllFixPost.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.fixPostList = payload
        });
        builder.addCase(thunkFetchAllFixPost.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(thunkFetchFixPostDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(thunkFetchFixPostDetail.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.fixPost = payload;
        });
        builder.addCase(thunkFetchFixPostDetail.rejected, (state) => {
            state.loading = false;
        })
    }
});

export const {
    setBlogLoading,
    resetSupportPost,
    resetFixPost
} = blogSlice.actions;

export default blogSlice.reducer;


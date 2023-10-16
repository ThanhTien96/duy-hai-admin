import { createSlice } from "@reduxjs/toolkit";
import { thunkFetchProductPagination } from "./productAsyncThunk";

export interface IProductSliceProps {
    productList?: any;
    loading: boolean;
}

const initialState: IProductSliceProps = {
    productList: [],
    loading: false,
};

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        setProductLoading: (state, {payload}) => {
            state.loading = payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(thunkFetchProductPagination.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(thunkFetchProductPagination.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.productList = payload;
        });
        builder.addCase(thunkFetchProductPagination.rejected, (state) => {
            state.loading = false;
        })
    }
});


export const {
    setProductLoading
} = productSlice.actions;

export default productSlice.reducer;
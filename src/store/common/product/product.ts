import { createSlice } from "@reduxjs/toolkit";
import { thunkFetchProductPagination } from "./productAsyncThunk";
import { IProductFromBE, IProductPagination } from "types/Product";

export interface IProductSliceProps {
  productList: IProductFromBE[];
  pagination?: IProductPagination;
  loading: boolean;
}

const initialState: IProductSliceProps = {
  productList: [],
  loading: false,
  pagination: undefined,
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProductLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkFetchProductPagination.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      thunkFetchProductPagination.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        if (state.productList.length <= 0) {
          state.productList = payload.data;
        } else {
          state.productList = state.productList.concat(payload.data);
        }
        state.pagination = {
          currentPage: payload.currentPage,
          total: payload.total,
          totalPages: payload.totalPages,
        };
      }
    );
    builder.addCase(thunkFetchProductPagination.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setProductLoading } = productSlice.actions;

export default productSlice.reducer;

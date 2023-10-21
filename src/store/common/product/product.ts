import { createSlice } from "@reduxjs/toolkit";
import { thunkFetchProductDetail, thunkFetchProductPagination } from "./productAsyncThunk";
import { IProductDetailFromBE, IProductFromBE, IProductPagination } from "types/Product";

export interface IProductSliceProps {
  productList: IProductFromBE[];
  pagination?: IProductPagination;
  loading: boolean;
  productDetail?: IProductDetailFromBE;
}

const initialState: IProductSliceProps = {
  productList: [],
  productDetail: undefined,
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
        state.productList = payload.data;
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
    builder.addCase(thunkFetchProductDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(thunkFetchProductDetail.fulfilled, (state,  {payload}) => {
      state.loading = false;
      state.productDetail = payload;
    });
    builder.addCase(thunkFetchProductDetail.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setProductLoading } = productSlice.actions;

export default productSlice.reducer;

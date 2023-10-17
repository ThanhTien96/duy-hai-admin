import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { ProductService } from "services/productRequester";
import { IProductFromBE } from "types/Product";

export type TProductGetParams = {
  page?: number;
  perPage?: number;
  keyWord?: string;
  signal?: AbortSignal;
};

// fetch product pagination
export const thunkFetchProductPagination = createAsyncThunk(
  "productSlice/fetchProduct",
  async (params: TProductGetParams, { rejectWithValue }) => {
    try {
      const res = await ProductService.fetchProductPagination(params);
      return res.data;
    } catch (err: Error | any) {
      return rejectWithValue("Request was aborted");
    }
  }
);

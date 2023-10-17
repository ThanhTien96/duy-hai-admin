import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { ProductService } from "services/productRequester";
import { IProductFromBE } from "types/Product";

export type TProductGetParams = {
  page?: number;
  perPage?: number;
  keyWord?: string;
};

// fetch product pagination
export const thunkFetchProductPagination = createAsyncThunk(
  "productSlice/fetchProduct",
  async (params: TProductGetParams, thunkApi) => {
    const res = await ProductService.fetchProductPagination(params, thunkApi.signal);
    return res.data;
  }
);

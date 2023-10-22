import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductService } from "services";
import { TGetAxiosResponseClient } from "types/AxiosClient";
import { IProductDetailFromBE, IProductFromBE } from "types/Product";

export type TProductGetParams = {
  page?: number;
  perPage?: number;
  keyWord?: string;
  maDanhMucNho?: string;
  signal?: AbortSignal;
};

// fetch product pagination
export const thunkFetchProductPagination = createAsyncThunk(
  "productSlice/fetchProduct",
  async (params: TProductGetParams, { rejectWithValue }) => {
    try {
      const res: TGetAxiosResponseClient<IProductFromBE[]> =
        await ProductService.fetchProductPagination(params);
      return res.data;
    } catch (err: Error | any) {
      return rejectWithValue("Request was aborted");
    }
  }
);

export const thunkFetchProductDetail = createAsyncThunk(
  "productSlice/fetchProductDetail",
  async (id: string, thunkApi) => {
    const res: TGetAxiosResponseClient<IProductDetailFromBE> =
      await ProductService.getProductDetail(id, thunkApi.signal);
    return res.data.data;
  }
);

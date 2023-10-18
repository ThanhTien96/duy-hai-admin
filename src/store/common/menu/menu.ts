import { createSlice } from "@reduxjs/toolkit";
import { IMainCategoriesFromBE, ISubCategoriesFormBE, TMenuFromBE } from "types/Menu";
import { thunkFetMainCategories, thunkFetchMenu, thunkFetchSubCategories } from "./menuAsyncThunk";

export interface IMenuSliceProps {
    menu?: TMenuFromBE;
    loading: boolean;
    categoriesList: IMainCategoriesFromBE[];
    subCategoriesList: ISubCategoriesFormBE[];
}

const initialState: IMenuSliceProps = {
    menu: undefined,
    loading: false,
    categoriesList: [],
    subCategoriesList: [],
};

const menuSlice = createSlice({
    name: "menuSlice",
    initialState,
    reducers: {
        setMenuPageLoading: (state, {payload}) => {
            state.loading = payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(thunkFetchMenu.pending, (state) => {
            state.loading = true
        });
        builder.addCase(thunkFetchMenu.fulfilled, (state, {payload}) => {
            state.menu = payload;
            state.loading = false;
        });
        builder.addCase(thunkFetchMenu.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(thunkFetMainCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(thunkFetMainCategories.fulfilled, (state, {payload}) => {
            state.categoriesList = payload;
            state.loading = false;
        });
        builder.addCase(thunkFetMainCategories.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(thunkFetchSubCategories.fulfilled, (state, {payload}) => {
            state.subCategoriesList = payload;
        })
    }
});

export const {
    setMenuPageLoading,
} = menuSlice.actions;

export default menuSlice.reducer;
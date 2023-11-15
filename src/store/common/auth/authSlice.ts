import { createSlice } from "@reduxjs/toolkit";
import { IS_AUTH } from "constants/auth.constant";
import { thunkFetchProfile } from "./authAsyncThunk";
import { redirect } from "react-router";
import { IUserFromBe } from "types/User";



export interface IAuthSliceType {
    loading: boolean;
    status: IS_AUTH.auth | IS_AUTH.unAuth;
    profile?: IUserFromBe;
}

const initialState: IAuthSliceType = {
    loading: false,
    status: IS_AUTH.unAuth,
    profile: undefined,
};


const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        userLogout: () => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("expired_at");
            return initialState;
        },  
        setIsAuthStatus: (state, {payload}) => {
            state.status = payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(thunkFetchProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(thunkFetchProfile.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.profile = payload;
            state.status = IS_AUTH.auth;
            redirect('/home')
        });
        builder.addCase(thunkFetchProfile.rejected, (state) => {
            state.loading = false;
        }) 
    }
});


export const {
    setIsAuthStatus,
    userLogout,
} = authSlice.actions;

export default authSlice.reducer;


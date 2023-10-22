import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "services";


// fetch profile
export const thunkFetchProfile = createAsyncThunk(
    "authSlice/userFetchProfile",
    async () => {
        const res = await AuthService.userFetchProfile();
        return res.data.data;
    }
)


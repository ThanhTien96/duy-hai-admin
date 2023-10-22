import http from "@axios/http";
import { authPaths } from "constants/apiPaths";
import { TUserLoginValue } from "types/Auth";


class AuthService {
    // login
    static userLogin = async (data: TUserLoginValue, signal?: AbortSignal) => {
        return await http({
            url: authPaths.login,
            method: "POST",
            data,
            signal
        })
    }

    //  fetProfile 
    static userFetchProfile = async (signal?: AbortSignal) => {
        return await http({
            url: authPaths.fetchProfile,
            method: "POST",
            signal,
        })
    } 
}

export default AuthService;
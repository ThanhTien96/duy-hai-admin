import http from "@axios/http";
import { newsPaths } from "constants/apiPaths";

class PostService {
    static getAllNewsType = async (signal?: AbortSignal) => {
        return await http({
            url: newsPaths.getAllNewsType,
            method: "GET",
            signal,
        })
    } 

    // create news type
    static createNewsType = async (data: {loaiTinTuc: string}, signal?: AbortSignal) => {
        return await http({
            url: newsPaths.createNewsType,
            method: "POST",
            data,
            signal
        })
    }
}

export default PostService;

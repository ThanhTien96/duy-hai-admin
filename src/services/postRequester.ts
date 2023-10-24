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

    // update news type
    static updateNewsType = async (id: string, data: {loaiTinTuc: string}, signal?: AbortSignal) => {
        return await http({
            url: newsPaths.updateNewsType,
            method: "PUT",
            data,
            params: {
                maLoaiTinTuc: id
            },
            signal
        })
    }
    // delete news type
    static deleteNewsType = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: newsPaths.deleteNewsType,
            method: "DELETE",
            params: {
                maLoaiTinTuc: id
            },
            signal
        })
    }
}

export default PostService;

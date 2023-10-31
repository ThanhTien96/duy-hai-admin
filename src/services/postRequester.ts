import http from "@axios/http";
import { PAGE_SIZE } from "constants";
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
    };

    // ***  POST    *** //
    static createNews = async (data: FormData, signal?: AbortSignal) => {
        return await http({
            url: newsPaths.createNews,
            method: "POST",
            data,
            signal            
        })
    }

    static fetchAllNews = async (page = 1, perPage = PAGE_SIZE.news, keyWord = '') => {
        return await http({
            url: newsPaths.fetchAllNews,
            method: "GET",
            params: {
                page,
                perPage,
                keyWord,
            }
        })
    }

    // fetch news detail
    static fetchNewsDetail = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: newsPaths.fetchNewsDetail,
            method: "GET",
            params: {
                maTinTuc: id
            },
            signal,
        })
    }

    // update news 
    static updateNews = async  (id: string, data: FormData, signal?: AbortSignal) => {
        return await http({
            url: newsPaths.updateNews,
            method: "PUT",
            params: {
                maTinTuc: id 
            },
            data,
            signal,
        })
    }

    // delete news 
    static deleteNews = async (id: string) => {
        return await http({
            url: newsPaths.deleteNews,
            method: "DELETE",
            params: {
                maTinTuc: id
            }
        })
    }

}

export default PostService;

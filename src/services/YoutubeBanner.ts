import { bannerPaths, youtubePaths } from './../constants/apiPaths';
import http from "@axios/http"

class YoutubeBannerService {
    static fetchAllBanner = async (signal?: AbortSignal) => {
        return await http({
            url: bannerPaths.getAll,
            method: "GET",
            signal,
        })
    }

    // add banner
    static createBanner = async (data: FormData, signal?: AbortSignal) => {
        return await http({
            url: bannerPaths.createBanner,
            method: "POST",
            data,
            signal
        })
    }

    // delete banner
    static deleteBanner = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: bannerPaths.deleteBanner,
            method: "DELETE",
            params: {
                maBanner: id
            },
            signal,
        })
    }

    /** YOUTUBE */

    // get all
    static getAllYoutube = async (signal?: AbortSignal) => {
        return await http({
            url: youtubePaths.getAll,
            method: "GET",
            signal
        })
    }
    // get detail
    static getYoutubeDetail = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: youtubePaths.getDetail,
            method: "GET",
            params: {
                maYT: id
            },
            signal,
        })
    };
    // create 
    static createYoutube = async (data: FormData, signal?: AbortSignal) => {
        return await http({
            url: youtubePaths.create,
            method: "POST",
            data,
            signal
        })
    };
    // update
    static updateYoutube = async (id: string, data: FormData, signal?: AbortSignal) => {
        return await http({
            url: youtubePaths.update,
            method: "PUT",
            params: {
                maYT: id
            },
            data,
            signal
        })
    }
    // delete
    static deleteYoutube = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: youtubePaths.delete,
            method: "DELETE",
            params: {
                maYT: id,    
            },
            signal,
        })
    }

    
}

export default YoutubeBannerService
import http from "@axios/http";
import { blogPath } from "constants/apiPaths";
import { ISupportPostPayload } from "types/Blog";

class BlogRequester {
    // create support post
    static createSupportPost = async (payload: ISupportPostPayload, signal?: AbortSignal) => {
        return await http({
            url: blogPath.createSupportPost,
            method: "POST",
            data: payload,
            signal
        })
    }

    // fetch all support post
    static fetchAllSupportPost = async (signal?: AbortSignal) => {
        return await http({
            url: blogPath.getAllSupportPost,
            method: "GET",
            signal
        })
    }

    // fetch support post detail
    static fetchSupportPostDetail = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: blogPath.getSupportPostDetail,
            method: "GET",
            params: {id},
            signal
        })
    }

    // udpate support post
    static updateSupportPost = async (id: string, payload: Partial<ISupportPostPayload>,signal?: AbortSignal) => {
        return await http({
            url: blogPath.updateSupportPost,
            method: "PUT",
            params: {id},
            data: payload,
            signal
        })
    }

    // delete support post
    static deleteSupportPost = async (id: string,signal?: AbortSignal) => {
        return await http({
            url: blogPath.deleteSupportPost,
            method: "DELETE",
            params: {id},
            signal
        })
    }
    /** FIX POST REQUESTER */
    static createFixPost = async (data: FormData, signal?: AbortSignal) => {
        return await http({
            url: blogPath.createFixPost,
            method: "POST",
            data,
            signal
        })
    }

    // fetch all fix post
    static fetchAllFixPost = async (signal?: AbortSignal) => {
        return await http({
            url: blogPath.getAllFixPost,
            method: "GET",
            signal
        })
    }

    // fetch fix post detail
    static fetchFixPostDetail = async(maBaiViet : string, signal?: AbortSignal) => {
        return await http({
            url: blogPath.getFixPostDetail,
            method: "GET",
            params: {
                maBaiViet  
            },
            signal
        })
    }

    // udpate fix post
    static updateFixPost = async(maBaiViet: string, data: FormData, signal?: AbortSignal) => {
        return await http({
            url: blogPath.updateFixPost,
            method: "PUT",
            data,
            params: {
                maBaiViet
            },
            signal,
        })
    }
    // delete fix post
    static deleteFixPost = async (maBaiViet: string, signal?: AbortSignal) => {
        return await http({
            url: blogPath.deleteFixPost,
            method: "DELETE",
            params: {
                maBaiViet
            },
            signal
        })
    }
}

export default BlogRequester;
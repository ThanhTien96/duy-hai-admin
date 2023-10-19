import http from "@axios/http"
import { productPaths } from "constants/apiPaths"
import { TProductGetParams } from "store/common/product/productAsyncThunk"

class ProductService {
    // get product pagination
    static fetchProductPagination = async ({page = 1, perPage = 10, keyWord = "", signal}: TProductGetParams) => {
        return await http({
            url: productPaths.getProductPagination,
            params: {
                tenSanPham: keyWord,
                soTrang: page,
                soPhanTu: perPage
            },
            signal
        })
    }

    // get detail product
    static getProductDetail = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: productPaths.getProductDetail,
            method: "GET",
            params: {
                maSanPham: id
            }
        })
    }

    // create product
    static postProduct = async (data: FormData, signal?: AbortSignal) => {
        return await http({
            url: productPaths.createProduct,
            method: "POST",
            data,
            signal
        })
    }

    // update product
    static updateProduct = async (id: string, data: FormData, signal?: AbortSignal) => {
        return await http({
            url: productPaths.updateProduct,
            method: "PUT",
            params: {
                maSanPham: id
            },
            data,
            signal
        })
    } 

    // handle delete product
    static deleteProduct = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: productPaths.deleteProduct,
            method: "DELETE",
            params: {
                maSanPham: id
            },
            signal
        })
    }
}

export {
    ProductService
}
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
    static getDetailProduct = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: productPaths.getDetailProduct,
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

}

export {
    ProductService
}
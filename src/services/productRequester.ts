import http from "@axios/http"
import { PAGE_SIZE } from "constants"
import { productPaths } from "constants/apiPaths"
import { TProductGetParams } from "store/common/product/productAsyncThunk"
import { IProductPayloadType } from "types/Product"

class ProductService {
    // get product pagination
    static fetchProductPagination = async ({page = 1, perPage = PAGE_SIZE.product, keyWord = "", signal}: TProductGetParams) => {
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
            },
            signal,
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
    };

    // add image to product
    static addImageToProduct = async (id: string, data: FormData, signal?: AbortSignal) => {
        return await http({
            url: productPaths.addImageToProduct,
            method: "POST",
            data,
            params: {
                id
            },
            signal, 
        })
    }

    // change base image
    static changeBaseImage = async (id: string, baseImg: boolean, signal?: AbortSignal) => {
        return await http({
            url: productPaths.changeBaseImage,
            method: "POST",
            data: {
                hinhChinh: baseImg
            },
            params: {
                id
            },
            signal
        })
    }

    // update image product
    static updateImageProduct = async (id: string, data: FormData, signal?: AbortSignal) => {
        return await http({
            url: productPaths.updateImageProduct,
            method: "PUT",
            data,
            params: {
                id
            },
            signal
        })
    }

    // delete image product
    static deleteImageProdcut = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: productPaths.deleteImageProduct,
            method: "DELETE",
            params: {
                id
            },
            signal,
        })
    }

    // update omit some field
    static updateFieldProduct = async (id: string, data: Partial<IProductPayloadType>, signal?: AbortSignal) => {
        return await http({
            url: productPaths.updateProductWithoutImage,
            method: "PUT",
            data: data,
            params: {
                id 
            },
            signal
        })
    }
}

export {
    ProductService
}
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
}

export {
    ProductService
}
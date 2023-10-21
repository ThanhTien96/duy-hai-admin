import http from "@axios/http"
import { categoriesPaths } from "constants/apiPaths"
import { TCategoriesFormValue } from "pages/MenuPage/partials/CategoryBox/partials/MainCategoriesForm"
import { TSubCategoriesFormValue } from "pages/MenuPage/partials/CategoryBox/partials/SubCategoriesForm"

class CategoriesService {
    // get all main categories
    static fetchAllMainCategories = async (signal?: AbortSignal) => {
        return await http({
            url: categoriesPaths.getMainCategories,
            method: "GET",
            signal
        })
    } 

    // get detail main categories
    static getDetailMainCategories = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: categoriesPaths.getDetailMainCategories,
            method: "GET",
            params: {
                maDanhMucChinh: id
            },
             signal,
        })
    }

    // create Main categories
    static createMainCategories = async (data: TCategoriesFormValue, signal?:AbortSignal) => {
        return await http({
            url: categoriesPaths.createCategories,
            method: "POST",
            data,
            signal
        })
    }

    // update main categoris
    static updateMainCatetories = async (id: string, data: TCategoriesFormValue, signal?: AbortSignal) => {
        return await http({
            url: categoriesPaths.updateMainCategories,
            method: "PUT",
            data,
            params: {
                maDanhMucChinh: id
            },
            signal
        })
    } 

    // delete main categories
    static deleteMainCategories = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: categoriesPaths.deleteMainCategories,
            method: "DELETE",
            params: {
                maDanhMucChinh : id
            },
            signal
        });
    }

    // fetch detail sub categories
    static fetchDetailSubCategories = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: categoriesPaths.fetchDetailSubCategories,
            method: "GET",
            params: {
                maDanhMucNho: id
            },
            signal
        })
    }

    // create sub categories
    static createSubCategories = async (data: TSubCategoriesFormValue, signal?: AbortSignal) => {
        return await http({
            url: categoriesPaths.createSubCategories,
            method: "POST",
            data,
            signal
        })
    }

    // update sub categories
    static updateSubCategories = async (id: string, data: TSubCategoriesFormValue, signal?: AbortSignal) => {
        return await http({
            url: categoriesPaths.updateSubCategories,
            method: "PUT",
            params: {
                maDanhMucNho: id
            },
            data,
            signal
        })
    }

    // delete sub categories 
    static deleteSubCategories = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: categoriesPaths.deleteSubCategories,
            method: "DELETE",
            params: {
                maDanhMucNho: id
            },
            signal
        })
    }

    // fetch all sub categories
    static getAllSubCategories = async (signal?: AbortSignal) => {
        return await http({
            url: categoriesPaths.getAllSubCategories,
            method: "GET",
            signal
        })
    } 
}

export {
    CategoriesService
}
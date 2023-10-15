import http from "@axios/http"
import { menuPaths } from "constants/apiPaths"
import { TFormValue } from "pages/MenuPage/partials/BaseMenu/partials/NavLinkForm"
import { TSubLinkValue } from "pages/MenuPage/partials/BaseMenu/partials/SubLinkForm"

class MenuService {
    static fetchMenu = async (signal?: AbortSignal) => {
        return await http({
            url: menuPaths.get,
            method: "GET",
            signal
        })
    }
    // udpate menu (logo)
    static updateMenu = async (id: string, data: FormData, signal?: AbortSignal) => {
        return await http({
            url: menuPaths.updateMenu,
            method: "PUT",
            params: {
                maMenu : id
            },
            data,
            signal
        })
    }
    //  get all nav link
    static fetchAllNavLink = async (signal?: AbortSignal) => {
        return await http({
            url: menuPaths.getAllNavLink,
            method: "GET",
            signal
        })
    }
    // create navlink
    static createNavLink = async (data: TFormValue, signal?: AbortSignal) => {
        return await http({
            url: menuPaths.creatNavLink,
            method: "POST",
            data,
            signal: signal,
        })
    }
    // get detail
    static fetchDetailNavLink = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: menuPaths.getDetailNavLink,
            method: "GET",
            params: {
                maNavLink: id
            },
            signal
        })
    }

    // update navlink
    static updateNavLink = async (id: string, data: TFormValue, signal?: AbortSignal) => {
        return await http({
            url: menuPaths.updateNavLink,
            method: "PUT",
            params: {
                maNavLink: id
            },
            data, 
            signal
        })
    }

    // delete navlink
    static deleteNavLink = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: menuPaths.deleteNavLink,
            method: "DELETE",
            params: {
                maNavLink: id,
            },
            signal
        })
    }

    /** sub link */
    static createSubLink = async (data: TSubLinkValue, signal?: AbortSignal) => {
        return await http({
            url: menuPaths.createSubLink,
            method: "POST",
            data,
            signal
        })
    }
    // get detail sub link
    static fetchDetailSubLink = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: menuPaths.getDetailSubLink,
            method: "GET",
            params: {
                id,
            },
            signal,
        })
    }

    // update sublink
    static updateSubLink = async(id: string, data: TSubLinkValue, signal?: AbortSignal) => {
        return await http({
            url: menuPaths.updateSubLink,
            method: "PUT",
            data,
            params: {id},
            signal
        })
    }

    // delete sub link
    static deleteSubLink = async (id: string, signal?: AbortSignal) => {
        return await http({
            url: menuPaths.deleteSubLink,
            method: "DELETE",
            params: {
                id
            },
            signal
        })
    }
    
}

export default MenuService;
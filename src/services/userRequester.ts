import http from "@axios/http";
import { userPaths } from "constants/apiPaths";

class UserService {
    // USER TYPE
    static async getAllUserType(signal?: AbortSignal) {
        return await http({
            url: userPaths.getAllUserType,
            method: 'GET',
            signal,
        })
    }

    // get user type detail
    static async getUserTypeDetail(id: string, signal?: AbortSignal) {
        return await http({
            url: userPaths.getDetailUserType,
            method: "GET",
            params: {
                maLoaiNguoiDung: id
            },
            signal
        })
    }

    // create user type
    static async createUserType(data: {loaiNguoiDung: string}, signal?: AbortSignal) {
        return await http({
            url: userPaths.createUserType,
            method: "POST",
            data,
            signal,
        })
    }
    // update user type
    static async updateUserType(id: string, data: {loaiNguoiDung: string}, signal?: AbortSignal) {
        return await http({
            url: userPaths.updateUserType,
            method: "PUT",
            data,
            signal,
            params: {
                maLoaiNguoiDung : id
            }
        })
    }
    // delete user type
    static async deleteUserType(id: string, signal?: AbortSignal) {
        return await http({
            url: userPaths.deleteUserType,
            method: "DELETE",
            params: {
                maLoaiNguoiDung: id
            },
            signal,
        })
    }
}


export default UserService;
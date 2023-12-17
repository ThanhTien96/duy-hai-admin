import http from "@axios/http";
import { PAGE_SIZE } from "constants";
import { userPaths } from "constants/apiPaths";

class UserService {
  // USER TYPE
  static async getAllUserType(signal?: AbortSignal) {
    return await http({
      url: userPaths.getAllUserType,
      method: "GET",
      signal,
    });
  }

  // get user type detail
  static async getUserTypeDetail(id: string, signal?: AbortSignal) {
    return await http({
      url: userPaths.getDetailUserType,
      method: "GET",
      params: {
        maLoaiNguoiDung: id,
      },
      signal,
    });
  }

  // create user type
  static async createUserType(
    data: { loaiNguoiDung: string },
    signal?: AbortSignal
  ) {
    return await http({
      url: userPaths.createUserType,
      method: "POST",
      data,
      signal,
    });
  }
  // update user type
  static async updateUserType(
    id: string,
    data: { loaiNguoiDung: string },
    signal?: AbortSignal
  ) {
    return await http({
      url: userPaths.updateUserType,
      method: "PUT",
      data,
      signal,
      params: {
        maLoaiNguoiDung: id,
      },
    });
  }
  // delete user type
  static async deleteUserType(id: string, signal?: AbortSignal) {
    return await http({
      url: userPaths.deleteUserType,
      method: "DELETE",
      params: {
        maLoaiNguoiDung: id,
      },
      signal,
    });
  }

  // USER
  static async getAllUser(
    page = 1,
    perPage = PAGE_SIZE.user,
    signal?: AbortSignal
  ) {
    return await http({
      url: userPaths.getAllUser,
      method: "GET",
      params: {
        page,
        perPage
      },
      signal,
    });
  }

  // get user detail
  static async getUserDetail(id: string, signal?: AbortSignal) {
    return await http({
      url: userPaths.getUserDetail,
      method: "GET",
      params: {
        maNguoiDung: id,
      },
      signal,
    });
  }
  // create user
  static async createUser(data: FormData, signal?: AbortSignal) {
    return http({
      url: userPaths.createUser,
      method: "POST",
      data,
      signal,
    });
  }
  // update user
  static async updateUser(id: string, data: FormData, signal?: AbortSignal) {
    return http({
      url: userPaths.updateUser,
      method: "PUT",
      params: {
        maNguoiDung: id,
      },
      data,
      signal,
    });
  }

  // change theme and color
  static async changeThemeColor(id: string, data: {theme?: string, primaryColor?: string}, signal?: AbortSignal) {
    return await http({
      url: userPaths.updateUser,
      method: "PUT",
      params: {
        maNguoiDung: id
      },
      data,
      signal,
    })
  }
  // delete user
  static async deleteUser(id: string, signal?: AbortSignal) {
    return await http({
      url: userPaths.deleteUser,
      method: "DELETE",
      params: {
        maNguoiDung: id,
      },
      signal,
    });
  }
}

export default UserService;

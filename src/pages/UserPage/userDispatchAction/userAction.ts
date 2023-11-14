import { EUserReducer } from "constants/enum.constant";
import { IProductPagination } from "types/Product";
import { IUserFromBe, IUserTypeFromBe } from "types/User";

class UserAction {
    pageLoading(payload: boolean) {
        return {
            type: EUserReducer.PAGE_LOADING,
            payload,
        }
    }

    setUserType(data: IUserTypeFromBe[]) {
        return {
            type: EUserReducer.USER_TYPE,
            payload: data
        }
    }

    // controll user type modal
    isOpenUserTypeModal(payload: boolean) {
        return {
            type: EUserReducer.USER_TYPE_MODAL,
            payload,
        }
    }

    // user list
    setUserList(payload: IUserFromBe[]){
        return {
            type: EUserReducer.USER_LIST,
            payload
        }
    }
    // pagination
    setUserPagination(payload: IProductPagination) {
        return {
            type: EUserReducer.USER_PAGINATION,
            payload,
        }
    }
    // user drawer action
    isOpenUserDrawer(payload: boolean) {
        return {
            type: EUserReducer.USER_DRAWER,
            payload,
        }
    }
    // set user detail
    setUserDetail(payload: IUserFromBe | undefined){
        return {
            type: EUserReducer.USER_DETAIL,
            payload,
        }
    }
}

const userAction = new UserAction();
export default userAction;
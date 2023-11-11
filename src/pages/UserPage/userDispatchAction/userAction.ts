import { EUserReducer } from "constants/enum.constant";
import { IUserTypeFromBe } from "types/User";

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
}

const userAction = new UserAction();
export default userAction;
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import React, { createContext, useReducer, Dispatch } from "react";
import { Col, Row, Spin, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { COPY_RIGHT, STATUS_CODE } from "constants";
import { UserType } from "./partials";
import { IUserTypeFromBe } from "types/User";
import { EUserReducer } from "constants/enum.constant";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "store";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import userAction from "./userDispatchAction/userAction";
import UserService from "services/userRequester";

const { Text } = Typography;

export interface IUserReducer {
  userType: IUserTypeFromBe[];
  loading: boolean;
  userTypeModal: boolean;
}

export type TUserReducerAction = {
  type: EUserReducer;
  payload: any;
};

const initialState: IUserReducer = {
  userType: [],
  loading: false,
  userTypeModal: false,
};

const userReducer = (state: IUserReducer, action: TUserReducerAction) => {
  const { type, payload } = action;
  switch (type) {
    case EUserReducer.PAGE_LOADING:
      return { ...state, loading: payload };
    case EUserReducer.USER_TYPE:
      return { ...state, userType: payload };
    case EUserReducer.USER_TYPE_MODAL:
      return { ...state, userTypeModal: payload };
    default:
      return state;
  }
};

export const UserContext = createContext<{
  state: IUserReducer;
  dispatch: Dispatch<TUserReducerAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const UserPage: React.FC = () => {
  const storeDispatch = useAppDispatch();
  const [state, dispatch] = useReducer(userReducer, initialState);
  const controller = new AbortController();

  useEffect(() => {
    handleFetchAllUserType(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  /******** USER TYPE ACTION **********/
  // handle fetch all user type
  const handleFetchAllUserType = useCallback(async (signal?: AbortSignal) => {
    dispatch(userAction.pageLoading(true));
    try {
      const response = await UserService.getAllUserType(signal);
      if (response.status === STATUS_CODE.success) {
        dispatch(userAction.setUserType(response.data.data));
      }
    } catch (err: Error | any) {
      storeDispatch(
        setAlert({
          message: MESSAGE_TEXT.getAllFail,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(userAction.pageLoading(false));
    }
  }, []);

  // handle create uer type
  const handleCreateUserType = useCallback(
    async (data: { loaiNguoiDung: string }, signal?: AbortSignal) => {
      dispatch(userAction.pageLoading(true));
      try {
        const res = await UserService.createUserType(data, controller.signal);
        if (res.status === STATUS_CODE.success) {
          storeDispatch(
            setAlert({
              message: MESSAGE_TEXT.createSuccess,
              status: STORE_STATUS.success,
            })
          );
          handleFetchAllUserType(signal);
        }
      } catch (err: Error | any) {
        storeDispatch(
          setAlert({
            message: err.response.data.message ?? MESSAGE_TEXT.createFaild,
            status: STORE_STATUS.error,
          })
        );
      } finally {
        dispatch(userAction.pageLoading(false));
        dispatch(userAction.isOpenUserTypeModal(false));
      }
    },
    []
  );

  // const handle update user type
  const handleUpdateUserType = useCallback(
    async (id: string, loaiNguoiDung: string, signal?: AbortSignal) => {
      dispatch(userAction.pageLoading(false))
      try {
        const res = await UserService.updateUserType(id, {loaiNguoiDung}, signal);
        if(res.status === STATUS_CODE.success) {
          handleFetchAllUserType(signal);
          storeDispatch(setAlert({message:MESSAGE_TEXT.updateSuccess, status: STORE_STATUS.success}));
        }
      } catch (err: Error | any) {
        storeDispatch(setAlert({message: err.response.data.message ?? MESSAGE_TEXT.updateFaild, status: STORE_STATUS.error}));
      } finally {
        dispatch(userAction.pageLoading(false));
        dispatch(userAction.isOpenUserTypeModal(false))
      }
    },
    [],
  )

   // const handle update user type
   const handleDeleteUserType = useCallback(
    async (id: string, signal?: AbortSignal) => {
      dispatch(userAction.pageLoading(false))
      try {
        const res = await UserService.deleteUserType(id, signal);
        if(res.status === STATUS_CODE.success) {
          storeDispatch(setAlert({message:MESSAGE_TEXT.deleteSuccess, status: STORE_STATUS.success}));
          handleFetchAllUserType(signal);
        }
      } catch (err: Error | any) {
        storeDispatch(setAlert({message: err.response.data.message ?? MESSAGE_TEXT.deleteFaild, status: STORE_STATUS.error}));
      } finally {
        dispatch(userAction.pageLoading(false));
        dispatch(userAction.isOpenUserTypeModal(false))
      }
    },
    [],
  )
  

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <PlainLayout
        headerprops={{
          breadcrumb: {
            items: [
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                title: <Text>{location.pathname.replace("/", "")}</Text>,
              },
            ],
          },
          title: "Danh Sách Người Dùng",
        }}
        footerprops={{
          children: COPY_RIGHT,
          className: "text-center",
        }}
        className="bg-inherit px-8"
      >
        <Spin spinning={state.loading}>
          <Row gutter={[32, 32]}>
            <Col span={18}></Col>
            <Col span={6}>
              <UserType onCreate={handleCreateUserType} onDelete={handleDeleteUserType} onUpdate={handleUpdateUserType} />
            </Col>
          </Row>
        </Spin>
      </PlainLayout>
    </UserContext.Provider>
  );
};

export default UserPage;

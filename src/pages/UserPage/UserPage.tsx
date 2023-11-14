import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import React, { createContext, useReducer, Dispatch } from "react";
import { Button, Col, Row, Spin, Typography } from "antd";
import { HomeOutlined, UserAddOutlined } from "@ant-design/icons";
import { COPY_RIGHT, PAGE_SIZE, STATUS_CODE } from "constants";
import { UserList, UsersType } from "./partials";
import { IUserFromBe, IUserTypeFromBe } from "types/User";
import { EUserReducer } from "constants/enum.constant";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "store";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import userAction from "./userDispatchAction/userAction";
import UserService from "services/userRequester";
import { IProductPagination } from "types/Product";
import { TUserFormValue } from "./partials/UserList/partials/UserForm";

const { Text } = Typography;

export interface IUserReducer {
  userType: IUserTypeFromBe[];
  userList: IUserFromBe[];
  pagination?: IProductPagination;
  loading: boolean;
  userTypeModal: boolean;
  userDrawer: boolean;
  userDetail?: IUserFromBe;
}

export type TUserReducerAction = {
  type: EUserReducer;
  payload: any;
};

const initialState: IUserReducer = {
  userType: [],
  userList: [],
  pagination: undefined,
  userDetail: undefined,
  loading: false,
  userTypeModal: false,
  userDrawer: false,
};

const userReducer = (state: IUserReducer, action: TUserReducerAction) => {
  const { type, payload } = action;
  switch (type) {
    case EUserReducer.PAGE_LOADING:
      return { ...state, loading: payload };
    case EUserReducer.USER_LIST:
      return { ...state, userList: payload };
    case EUserReducer.USER_PAGINATION:
      return { ...state, pagination: payload };
    case EUserReducer.USER_TYPE:
      return { ...state, userType: payload };
    case EUserReducer.USER_TYPE_MODAL:
      return { ...state, userTypeModal: payload };
    case EUserReducer.USER_DRAWER:
      return { ...state, userDrawer: payload };
    case EUserReducer.USER_DETAIL:
      return { ...state, userDetail: payload };
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
    handleFetchUser(1, PAGE_SIZE.user, controller.signal);
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
      dispatch(userAction.pageLoading(false));
      try {
        const res = await UserService.updateUserType(
          id,
          { loaiNguoiDung },
          signal
        );
        if (res.status === STATUS_CODE.success) {
          handleFetchAllUserType(signal);
          storeDispatch(
            setAlert({
              message: MESSAGE_TEXT.updateSuccess,
              status: STORE_STATUS.success,
            })
          );
        }
      } catch (err: Error | any) {
        storeDispatch(
          setAlert({
            message: err.response.data.message ?? MESSAGE_TEXT.updateFaild,
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
  const handleDeleteUserType = useCallback(
    async (id: string, signal?: AbortSignal) => {
      dispatch(userAction.pageLoading(false));
      try {
        const res = await UserService.deleteUserType(id, signal);
        if (res.status === STATUS_CODE.success) {
          storeDispatch(
            setAlert({
              message: MESSAGE_TEXT.deleteSuccess,
              status: STORE_STATUS.success,
            })
          );
          handleFetchAllUserType(signal);
        }
      } catch (err: Error | any) {
        storeDispatch(
          setAlert({
            message: err.response.data.message ?? MESSAGE_TEXT.deleteFaild,
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

  /** USER ACTION */
  const handleFetchUser = useCallback(
    async (page?: number, perPage?: number, signal?: AbortSignal) => {
      dispatch(userAction.pageLoading(true));
      try {
        const res = await UserService.getAllUser(page, perPage, signal);
        if (res.status === STATUS_CODE.success) {
          dispatch(userAction.setUserList(res.data.data));
          const pagination: IProductPagination = {
            total: res.data.total,
            currentPage: res.data.currentPage,
            totalPages: res.data.totalPage,
          };
          dispatch(userAction.setUserPagination(pagination));
        }
      } catch (err: Error | any) {
        storeDispatch(
          setAlert({
            message: err.response.data.message ?? MESSAGE_TEXT.getAllFail,
            status: STORE_STATUS.error,
          })
        );
      } finally {
        dispatch(userAction.pageLoading(false));
      }
    },
    []
  );

  // create user
  const handleCreateUser = useCallback(
    async (value: TUserFormValue, signal?: AbortSignal) => {
      dispatch(userAction.pageLoading(true));
      const formData = new FormData();

      formData.append("taiKhoan", value.taiKhoan);
      formData.append("matKhau", value.matKhau);
      formData.append("hoTen", value.hoTen);
      formData.append("email", value.email);
      formData.append("soDT", value.soDT);
      formData.append("theme", value.theme);
      formData.append("primaryColor", value.primaryColor);
      formData.append("maLoaiNguoiDung", value.maLoaiNguoiDung);
      if (value.hinhAnh) {
        value.hinhAnh.forEach((ele: any) => {
          formData.append("hinhAnh", ele.originFileObj);
        });
      }
      try {
        const res = await UserService.createUser(formData, signal);
        if (res.status === STATUS_CODE.success) {
          storeDispatch(
            setAlert({
              message: MESSAGE_TEXT.createSuccess,
              status: STORE_STATUS.success,
            })
          );
          dispatch(userAction.isOpenUserDrawer(false));
          handleFetchUser(1, PAGE_SIZE.user, signal);
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
      }
    },
    []
  );

  // delete user
  const handleDeleteUser = useCallback(
    async (id: string, signal?: AbortSignal) => {
      dispatch(userAction.pageLoading(true));
      try {
        const res = await UserService.deleteUser(id, signal);
        if (res.status === STATUS_CODE.success) {
          storeDispatch(
            setAlert({
              message: MESSAGE_TEXT.deleteSuccess,
              status: STORE_STATUS.success,
            })
          );
          handleFetchUser(1, PAGE_SIZE.user, signal);
        }
      } catch (err: Error | any) {
        storeDispatch(
          setAlert({
            message: err.response.data.message ?? MESSAGE_TEXT.deleteFaild,
            status: STORE_STATUS.error,
          })
        );
      } finally {
        dispatch(userAction.pageLoading(false));
      }
    },
    []
  );

  // fetch user detail
  const handleFetchUserDetail = useCallback(
    async (id: string, signal?: AbortSignal) => {
      dispatch(userAction.pageLoading(true))
      try {
        const res = await UserService.getUserDetail(id, signal);
        if(res.status === STATUS_CODE.success) {
          dispatch(userAction.setUserDetail(res.data.data));
          dispatch(userAction.isOpenUserDrawer(true));
        }
      } catch (err: Error | any) {
        storeDispatch(setAlert({message: err.response.data.message ?? MESSAGE_TEXT.getDetailFaild, status: STORE_STATUS.error}))
      } finally {
        dispatch(userAction.pageLoading(false))
      }
    },
    []
  )

  // update user
  const handleUpdateUser = useCallback(
    async (id: string, value: TUserFormValue, signal?: AbortSignal) => {
      dispatch(userAction.pageLoading(true));
      const formData = new FormData();

      formData.append("taiKhoan", value.taiKhoan);
      formData.append("hoTen", value.hoTen);
      formData.append("email", value.email);
      formData.append("soDT", value.soDT);
      formData.append("theme", value.theme);
      formData.append("primaryColor", value.primaryColor);
      formData.append("maLoaiNguoiDung", value.maLoaiNguoiDung);
      if(value.matKhau) {
        formData.append("matKhau", value.matKhau);
      }
      if (value.hinhAnh) {
        value.hinhAnh.forEach((ele: any) => {
          formData.append("hinhAnh", ele.originFileObj);
        });
      }
      try {
        const res = await UserService.updateUser(id, formData,signal);
        if(res.status === STATUS_CODE.success) {
          storeDispatch(setAlert({message: MESSAGE_TEXT.updateSuccess, status: STORE_STATUS.success}));
          handleFetchUser(1, PAGE_SIZE.user, signal);
          dispatch(userAction.isOpenUserDrawer(false));
          dispatch(userAction.setUserDetail(undefined))
        }
      } catch (err: Error | any) {
        storeDispatch(setAlert({message: err.response.data.message ?? MESSAGE_TEXT.updateFaild, status: STORE_STATUS.error}))
      } finally {
        dispatch(userAction.pageLoading(false))
      }
    },
    []
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
          <div className="mb-4 flex justify-end">
            <Button
              onClick={() => dispatch(userAction.isOpenUserDrawer(true))}
              icon={<UserAddOutlined />}
              type="primary"
            >
              Thêm Tài Khoản
            </Button>
          </div>
          <Row gutter={[32, 32]}>
            <Col span={18}>
              <UserList
                fetchUserDetail={handleFetchUserDetail}
                onDelete={handleDeleteUser}
                onCreateUser={handleCreateUser}
                fetchUserList={handleFetchUser}
                onUpdate={handleUpdateUser}
              />
            </Col>
            <Col span={6}>
              <UsersType
                onCreate={handleCreateUserType}
                onDelete={handleDeleteUserType}
                onUpdate={handleUpdateUserType}
              />
            </Col>
          </Row>
        </Spin>
      </PlainLayout>
    </UserContext.Provider>
  );
};

export default UserPage;

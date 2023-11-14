import {
  Avatar,
  Drawer,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { UserContext } from "pages/UserPage/UserPage";
import React, { useContext, useEffect } from "react";
import { IUserFromBe, IUserTypeFromBe } from "types/User";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { PAGE_SIZE } from "constants";
import UserForm, { TUserFormValue } from "./partials/UserForm";
import userAction from "pages/UserPage/userDispatchAction/userAction";
import { useAppDispatch, useAppSelector } from "store";
import { setAlert } from "store/app/alert";
import { STORE_STATUS } from "constants/apiMessage";


type TUserListProps = {
  fetchUserList?: (
    page?: number,
    perPage?: number,
    signal?: AbortSignal
  ) => void;
  onCreateUser?: (value: TUserFormValue, signal?: AbortSignal) => void;
  onDelete?: (id: string, signal?: AbortSignal) => void;
  fetchUserDetail?: (id: string, signal?: AbortSignal) => void
  onUpdate?: (id: string, value: TUserFormValue, signal?: AbortSignal) => void;
};

interface DataType {
  key: React.Key;
  hinhAnh: string;
  hoTen: string;
  taiKhoan: string;
  role: IUserTypeFromBe;
  email: string;
  soDT: string;
  action: string;
}

const UserList = ({
  fetchUserList,
  onCreateUser,
  onDelete,
  fetchUserDetail,
  onUpdate
}: TUserListProps) => {
  const { state, dispatch } = useContext(UserContext);
  const { colorPrimary } = useAppSelector(state => state.app.theme)
  const controller = new AbortController();
  const storeDispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Ảnh Đại Diện",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (url: string, data) =>
        url ? (
          <Avatar size={64} src={<img src={url} />} />
        ) : (
          <Avatar style={{ backgroundColor: colorPrimary ?? '#87d068' }} className="!text-3xl" size={64}>{data.hoTen[0].toUpperCase()}</Avatar>
        ),
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      ellipsis: {
        showTitle: false,
      },
      render: (name: string) => (
        <Tooltip placement="topLeft" title={name}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: "Loại Người Dùng",
      dataIndex: "role",
      key: "role",
      ellipsis: {
        showTitle: false,
      },
      render: (role: IUserTypeFromBe) => (
        <Tag
          color={
            role.loaiNguoiDung === "admin"
              ? "red-inverse"
              : role.loaiNguoiDung === "staff"
              ? "cyan-inverse"
              : "geekblue-inverse"
          }
        >
          {role.loaiNguoiDung}
        </Tag>
      ),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      ellipsis: {
        showTitle: false,
      },
      render: (email: string) => (
        <Tooltip placement="topLeft" title={email}>
          {email}
        </Tooltip>
      ),
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "soDT",
      key: "soDT",
      ellipsis: {
        showTitle: false,
      },
      render: (phone: string) => (
        <Tooltip placement="topLeft" title={phone}>
          {phone}
        </Tooltip>
      ),
    },
    {
      title: "CTA",
      dataIndex: "action",
      key: "action",
      ellipsis: {
        showTitle: false,
      },
      width: "10%",
      render: (id: string) => (
        <Space>
          <EditFilled 
          onClick={() => fetchUserDetail && fetchUserDetail(id, controller.signal)}
          className="text-xl hover:text-green-500 cursor-pointer" />
          <Popconfirm
            title="có chắc bạn muốn xoá?"
            onConfirm={() => {
              const findSupperAdim = state.userList.find(
                (ele) => ele.taiKhoan === "duyhaiserver"
              );
              if (
                state.pagination?.total !== 1 &&
                findSupperAdim?.maNguoiDung !== id
              ) {
                onDelete && onDelete(id, controller.signal);
              } else {
                storeDispatch(
                  setAlert({
                    message: "Không đủ điều kiện xoá vui lòng liên hệ admin",
                    status: STORE_STATUS.warning,
                  })
                );
              }
            }}
          >
            <DeleteFilled className="text-xl hover:text-red-500 cursor-pointer" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: DataType[] =
    state.userList && state.userList.length > 0
      ? state.userList.map((ele: IUserFromBe) => ({
          key: ele.maNguoiDung,
          hinhAnh: ele.hinhAnh,
          hoTen: ele.hoTen,
          taiKhoan: ele.taiKhoan,
          role: ele.loaiNguoiDung,
          email: ele.email,
          soDT: ele.soDT,
          action: ele.maNguoiDung,
        }))
      : [];

  return (
    <React.Fragment>
      <Table
        className="justify-center"
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={{
          className: "!justify-center",
          total: state.pagination?.total,
          current: state.pagination?.currentPage,
          onChange: (e) =>
            fetchUserList &&
            fetchUserList(Number(e), PAGE_SIZE.user, controller.signal),
        }}
      />
      {/* Drawer user */}
      <Drawer
        destroyOnClose
        open={state.userDrawer}
        onClose={() => {
          dispatch(userAction.isOpenUserDrawer(false));
          dispatch(userAction.setUserDetail(undefined));
        }}
        width="35%"
      >
        <UserForm
          defaultValue={state.userDetail}
          resetForm={state.userDrawer}
          onSubmit={(value) => {
            if(state.userDetail) {
              onUpdate && onUpdate(state.userDetail.maNguoiDung, value, controller.signal)
            } else {
              onCreateUser && onCreateUser(value, controller.signal)
            }
          }}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default UserList;

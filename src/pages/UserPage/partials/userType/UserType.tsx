import {
  Button,
  Card,
  Divider,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Popover,
  Space,
} from "antd";
import { UserContext } from "pages/UserPage/UserPage";
import userAction from "pages/UserPage/userDispatchAction/userAction";
import React, { useContext, useEffect } from "react";
import { IUserTypeFromBe } from "types/User";
import { AppstoreAddOutlined, ToolFilled } from "@ant-design/icons";
import { useState } from "react";

type FieldType = {
  loaiNguoiDung: string;
};

type TUserTypeProps = {
  onCreate: (value: { loaiNguoiDung: string }, signal?: AbortSignal) => void;
  onUpdate: (id: string, loaiNguoiDung: string, signal?: AbortSignal) => void;
  onDelete: (id: string, signal?: AbortSignal) => void;
};

const UserType = ({ onCreate, onUpdate, onDelete }: TUserTypeProps) => {
  const { state, dispatch } = useContext(UserContext);
  const [userTypeDetail, setUserTypeDetail] = useState<{
    loaiNguoiDung: string;
    maLoaiNguoiDung: string;
  }>();
  const controller = new AbortController();


  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <React.Fragment>
      <Card
        title="Loại Người Dùng"
        size="small"
        extra={
          <Button
            size="small"
            type="primary"
            onClick={() => dispatch(userAction.isOpenUserTypeModal(true))}
            icon={<AppstoreAddOutlined />}
          >
            Thêm
          </Button>
        }
      >
        {state.userType && state.userType.length > 0 ? (
          state.userType.map((ele: IUserTypeFromBe, index) => (
            <div key={ele.maLoaiNguoiDung}>
              <Popover
                placement="bottom"
                trigger="click"
                content={
                  <Space direction="vertical">
                    <Button
                      onClick={() => {
                        setUserTypeDetail(
                          state.userType.find(
                            (type) =>
                              type.maLoaiNguoiDung === ele.maLoaiNguoiDung
                          )
                        );
                        dispatch(userAction.isOpenUserTypeModal(true));
                      }}
                      className="w-full"
                      size="small"
                      type="primary"
                      icon={<ToolFilled />}
                    >
                      Cập Nhật
                    </Button>
                    <Popconfirm
                      onConfirm={() =>
                        onDelete(ele.maLoaiNguoiDung, controller.signal)
                      }
                      title="Có chắc bạn muốn xoá?"
                    >
                      <Button
                        className="w-full"
                        size="small"
                        type="primary"
                        danger
                        icon={<ToolFilled />}
                      >
                        Xoá
                      </Button>
                    </Popconfirm>
                  </Space>
                }
              >
                <Button className="w-full" type="text">
                  {ele.loaiNguoiDung}
                </Button>
              </Popover>
              {index !== state.userType.length - 1 && (
                <Divider className="my-2" />
              )}
            </div>
          ))
        ) : (
          <div className="text-center">
            <Empty />
          </div>
        )}
      </Card>
      {/* modal form */}
      <Modal
        destroyOnClose
        open={state.userTypeModal}
        onCancel={() => {
          dispatch(userAction.isOpenUserTypeModal(false));
          setUserTypeDetail(undefined);
        }}
        title="Thêm Loại Người Dùng"
        footer={null}
      >
        <Form
          onFinish={(value) => {
            if (!userTypeDetail) {
              onCreate(value, controller.signal);
            } else {
              onUpdate(
                userTypeDetail.maLoaiNguoiDung,
                value.loaiNguoiDung,
                controller.signal
              );
            }
          }}
          className="mt-8"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item<FieldType>
            rules={[
              {
                required: true,
                message: "*Phải nhập loại người dùng",
              },
            ]}
            name="loaiNguoiDung"
            required
            label="Loại Người Dùng"
          >
            <Input
              defaultValue={userTypeDetail?.loaiNguoiDung}
              placeholder="Nhập loại người dùng"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
            <Button htmlType="submit" type="primary">
              {userTypeDetail ? "Cập Nhật" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default UserType;

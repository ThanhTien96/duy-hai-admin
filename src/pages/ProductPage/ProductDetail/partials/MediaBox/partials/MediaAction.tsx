import { Button, Modal, Popconfirm, Space } from "antd";
import React, { useState } from "react";
import { CodeFilled, EditFilled, DeleteFilled } from "@ant-design/icons";
import { UploadImage } from "components/shared";
import { ProductService } from "services/productRequester";
import { useAppDispatch } from "store";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import { STATUS_CODE } from "constants";
import { useParams } from "react-router";
import { thunkFetchProductDetail } from "store/common/product/productAsyncThunk";
import { setProductLoading } from "store/common/product/product";
type MediaActionProps = {
  onClick?: () => void;
  id?: string;
};

export type TDataAction = {
  label: React.ReactNode;
  icon?: React.ReactNode;
  action?: () => void;
};

const MediaAction = ({ onClick, id }: MediaActionProps) => {
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [fileUpdate, setFileUpdate] = useState<File>();
  const dispatch = useAppDispatch();
  const params = useParams();

  /*** action */
  // handle change base image
  const handleChangeBaseImage = async (id: string, base: boolean) => {
    dispatch(setProductLoading(true));
    try {
      const res = await ProductService.changeBaseImage(id, base);
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: "Đổi hình chính thành công!",
            status: STORE_STATUS.success,
          })
        );
        params.id && dispatch(thunkFetchProductDetail(params.id));
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: err.response.data.message,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setProductLoading(false));
    }
  };

  //   handle update image
  const handleUpdateImage = async (id: string, data: FormData) => {
    dispatch(setProductLoading(true));
    try {
      const res = await ProductService.updateImageProduct(id, data);
      if (res.status === STATUS_CODE.success) {
        setUpdateModal(false);
        dispatch(
          setAlert({ message: res.data.message, status: STORE_STATUS.success })
        );
        params.id && dispatch(thunkFetchProductDetail(params.id));
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: MESSAGE_TEXT.updateFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setProductLoading(false));
    }
  };

  //   handle delete image
  const handleDeleteImageProduct = async (id: string) => {
    dispatch(setProductLoading(true));
    try {
      const res = await ProductService.deleteImageProdcut(id);
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({ message: res.data.message, status: STORE_STATUS.success })
        );
        params.id && dispatch(thunkFetchProductDetail(params.id));
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.deleteFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setProductLoading(false));
    }
  };

  const dataAction: TDataAction[] = [
    {
      label: "Đặt Làm Hình Chính",
      icon: <CodeFilled />,
      action: () => {
        id && handleChangeBaseImage(id, true);
      },
    },
    {
      label: "Đổi Hình Ảnh",
      icon: <EditFilled />,
      action: () => {
        setUpdateModal((current) => !current);
      },
    },
    {
      label: "Xoá Hình Ảnh",
      icon: <DeleteFilled />,
    },
  ];

  return (
    <Space direction="vertical">
      {dataAction.map((ele: TDataAction, index: number) => {
        if (index === dataAction.length - 1) {
          return (
            <Popconfirm
              title="Xoá Hình Ảnh"
              description="Có chắc chắn muốn xoá hình ảnh ?"
              onCancel={() => onClick && onClick()}
              onConfirm={() => {
                id && handleDeleteImageProduct(id);
                onClick && onClick();
              }}
              okText="Có"
              cancelText="Không"
            >
              <Button
                key={index}
                className="w-full"
                icon={ele.icon}
              >
                {ele.label}
              </Button>
            </Popconfirm>
          );
        } else {
          return (
            <Button
              onClick={() => {
                ele.action && ele.action();
                onClick && onClick();
              }}
              key={index}
              className="w-full"
              icon={ele.icon}
            >
              {ele.label}
            </Button>
          );
        }
      })}

      <Modal
        open={updateModal}
        onCancel={() => setUpdateModal(false)}
        footer={[
          <Button
            onClick={() => {
              if (fileUpdate && id) {
                const formData = new FormData();
                formData.append("hinhAnh", fileUpdate);
                handleUpdateImage(id, formData);
              }
            }}
            key="action-update"
            type="primary"
          >
            Cập Nhật
          </Button>,
        ]}
      >
        <UploadImage
          resetFile={updateModal}
          filesQuantity={1}
          getfiles={(files) => {
            if (files) {
              setFileUpdate(files[0].originFileObj);
            }
          }}
        />
      </Modal>
    </Space>
  );
};

export default MediaAction;

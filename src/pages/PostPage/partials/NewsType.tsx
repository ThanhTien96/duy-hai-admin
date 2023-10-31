import {
  Button,
  Card,
  Empty,
  Input,
  Popconfirm,
  Popover,
  Space,
  Tag,
} from "antd";
import { useState } from "react";
import { PlusOutlined, SettingFilled } from "@ant-design/icons";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "store";
import { PostService } from "services";
import { STATUS_CODE } from "constants";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import { setAlert } from "store/app/alert";
import { setNewsLoading } from "store/common/news/newsSlice";
import { thunkFetchNewsType } from "store/common/news/newsAsyncThunk";

type NewsTypeProps = {
  className?: string;

};

const NewsType = ({ className }: NewsTypeProps) => {
  const dispatch = useAppDispatch();
  const controller = new AbortController();
  const [openSetting, setOpenSetting] = useState<string>("");
  const [addType, setAddType] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [update, setUpdate] = useState<string>();
  const {newsType} = useAppSelector(state => state.common.news)

  // action
  // handle create news type
  const handleCreateNewsType = async (data: { loaiTinTuc: string }) => {
    dispatch(setNewsLoading(true))
    try {
      const res = await PostService.createNewsType(data, controller.signal);
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.createSuccess,
            status: STORE_STATUS.success,
          })
        );
        dispatch(thunkFetchNewsType())
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.createFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setNewsLoading(false))
    }
  };

  // handle update
  const handlleUpdateNewsType = async (
    id: string,
    data: { loaiTinTuc: string }
  ) => {
    dispatch(setNewsLoading(true))
    try {
      const res = await PostService.updateNewsType(id, data);
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.updateSuccess,
            status: STORE_STATUS.success,
          })
        );
        dispatch(thunkFetchNewsType())
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.updateFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setNewsLoading(false))
    }
  };

  // handle delete news type
  const handleDeleteNewsType = async (id: string) => {
    dispatch(setNewsLoading(true))
    try {
      const res = await PostService.deleteNewsType(id);
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.deleteSuccess,
            status: STORE_STATUS.success,
          })
        );
        dispatch(thunkFetchNewsType())
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.deleteFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setNewsLoading(false))
    }
  };

  return (
    <Card
      size="small"
      title={"Loại Tin Tức"}
      className={clsx("w-full rounded-md", className)}
    >
      {newsType && newsType.length > 0 ? (
        <Space direction="vertical" className="w-full">
          {newsType?.map((ele) => (
            <div
              key={ele.maLoaiTinTuc}
              className="border border-solid border-gray-400 p-2 flex items-center rounded-md cursor-pointer hover:border-gray-300"
            >
              {update !== ele.maLoaiTinTuc ? (
                <Tag color="cyan" className="w-full text-center text-lg">
                  {ele.loaiTinTuc}
                </Tag>
              ) : (
                <Input
                  value={inputValue}
                  suffix={
                    <>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => {
                          setInputValue("");
                          setOpenSetting("");
                          setUpdate(undefined);
                          inputValue &&
                            handlleUpdateNewsType(ele.maLoaiTinTuc, {
                              loaiTinTuc: inputValue,
                            });
                        }}
                      >
                        Sửa
                      </Button>
                      <Button
                        onClick={() => {
                          setInputValue("");
                          setOpenSetting("");
                          setUpdate(undefined);
                        }}
                        size="small"
                      >
                        Huỷ
                      </Button>
                    </>
                  }
                  onChange={(value) => setInputValue(value.target.value)}
                  placeholder="Nhập tên loại tin tức"
                />
              )}
              <Popover
                content={
                  <div className="flex gap-4">
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => {
                        setInputValue(ele.loaiTinTuc);
                        setUpdate(ele.maLoaiTinTuc);
                        setOpenSetting("");
                      }}
                    >
                      Sửa
                    </Button>
                    <Popconfirm
                      title={`Xoá loại Tin Tức: ${ele.loaiTinTuc}`}
                      description="có chắc bán muốn xoá?"
                      onConfirm={() => {
                        setInputValue("");
                        setOpenSetting("");
                        setUpdate(undefined);
                        handleDeleteNewsType(ele.maLoaiTinTuc);
                      }}
                      okText="Có"
                      cancelText="Không"
                    >
                      <Button size="small" danger>
                        xoá
                      </Button>
                    </Popconfirm>
                  </div>
                }
                trigger="click"
                open={openSetting === ele.maLoaiTinTuc}
                onOpenChange={() => setOpenSetting("")}
              >
                <Button
                  onClick={() => setOpenSetting(openSetting.length > 0 ? "" : ele.maLoaiTinTuc )}
                  icon={<SettingFilled />}
                />
              </Popover>
            </div>
          ))}
        </Space>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      {addType && (
        <div className="flex items-center justify-between gap-4 mt-4">
          <Input
            suffix={
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  inputValue &&
                    handleCreateNewsType({ loaiTinTuc: inputValue });
                  setInputValue("");
                  setAddType(false);
                }}
              >
                Thêm
              </Button>
            }
            onChange={(value) => setInputValue(value.target.value)}
            placeholder="Nhập tên loại tin tức"
          />
          <Button onClick={() => setAddType(false)}>Hủy</Button>
        </div>
      )}
      {!addType && (
        <Button
          onClick={() => setAddType(true)}
          type="dashed"
          className="border border-dashed border-gray-300 shadow-none !w-full mt-4"
        >
          <PlusOutlined />
          Thêm
        </Button>
      )}
    </Card>
  );
};

export default NewsType;

import {
  Button,
  Card,
  Empty,
  Image,
  Modal,
  Popconfirm,
  Space,
  Spin,
  Typography,
} from "antd";
import {
  MainCategoriesForm,
  MainCategoriesItem,
  SubCategoriesBox,
} from "./partials";
import { useAppDispatch, useAppSelector } from "store";
import { IMainCategoriesFromBE, ISubCategoriesFormBE } from "types/Menu";
import { EMPTY_IMAGE, STATUS_CODE } from "constants";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import { useState } from "react";
import { TCategoriesFormValue } from "./partials/MainCategoriesForm";
import { Content } from "antd/es/layout/layout";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import { CategoriesService } from "services";
import { thunkFetMainCategories } from "store/common/menu/menuAsyncThunk";
import { setMenuPageLoading } from "store/common/menu/menu";
import SubCategoriesForm, {
  TSubCategoriesFormValue,
} from "./partials/SubCategoriesForm";

const { Text } = Typography;

const colorList = [
  "pink",
  "red",
  "cyan",
  "green",
  "purple",
  "volcano",
  "magenta",
];

const CategoryBox = () => {
  const { loading, categoriesList } = useAppSelector(
    (state) => state.common.menu
  );
  // main catetories state
  const [openMain, setOpenMain] = useState<{ title: string; open: boolean }>({
    title: "",
    open: false,
  });
  // sub categories state
  const [openSub, setOpenSub] = useState<{ title: string; open: boolean }>({
    title: "",
    open: false,
  });

  // detail main categories state
  const [detailMainCategories, setDetailMainCategories] =
    useState<IMainCategoriesFromBE>();

  // detail sub categories state
  const [detailSubCategories, setDetailSubCategories] =
    useState<ISubCategoriesFormBE>();

  // default categories state
  const [selectedCategories, setSelectedCategories] =
    useState<IMainCategoriesFromBE>();

  const dispatch = useAppDispatch();
  const controller = new AbortController();

  /****** ACTION *****/
  const handleCreateMainCategories = async (data: TCategoriesFormValue) => {
    dispatch(setMenuPageLoading(true));
    try {
      const res = await CategoriesService.createMainCategories(
        data,
        controller.signal
      );
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.createSuccess,
            status: STORE_STATUS.success,
          })
        );
        dispatch(thunkFetMainCategories());
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.createFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setMenuPageLoading(false));
      setOpenMain({ ...openMain, open: false });
    }
  };

  // get Detail main Categories
  const handleFetchDetailMainCategories = async (id: string) => {
    setOpenMain({ title: "Cập Nhật Danh Mục Chính", open: true });
    dispatch(setMenuPageLoading(true));
    try {
      const res = await CategoriesService.getDetailMainCategories(
        id,
        controller.signal
      );
      if (res.status === STATUS_CODE.success) {
        setDetailMainCategories(res.data.data);
      }
    } catch (err) {
      dispatch(
        setAlert({
          message: MESSAGE_TEXT.getDetailFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setMenuPageLoading(false));
    }
  };

  // handle update
  const handleUpdateMainCategories = async (
    id: string,
    value: TCategoriesFormValue
  ) => {
    dispatch(setMenuPageLoading(true));
    setOpenMain({ ...openMain, open: false });
    try {
      const res = await CategoriesService.updateMainCatetories(
        id,
        value,
        controller.signal
      );
      if (res.status === STATUS_CODE.success) {
        dispatch(thunkFetMainCategories());
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.updateSuccess,
            status: STORE_STATUS.success,
          })
        );
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: MESSAGE_TEXT.updateFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setMenuPageLoading(false));
      setDetailMainCategories(undefined);
    }
  };

  // delete main categories
  const handleDeleteMainCategories = async (id: string) => {
    dispatch(setMenuPageLoading(true));
    try {
      const res = await CategoriesService.deleteMainCategories(
        id,
        controller.signal
      );
      if (res.status === STATUS_CODE.success) {
        dispatch(thunkFetMainCategories());
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.deleteSuccess,
            status: STORE_STATUS.success,
          })
        );
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: MESSAGE_TEXT.deleteFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setMenuPageLoading(false));
    }
  };

  // handle create sub categories
  const handleCreateSubCategories = async (data: TSubCategoriesFormValue) => {
    dispatch(setMenuPageLoading(true));
    try {
      const res = await CategoriesService.createSubCategories(
        data,
        controller.signal
      );
      if (res.status === STATUS_CODE.success) {
        dispatch(thunkFetMainCategories());
        setOpenSub({ title: "", open: false });
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.createSuccess,
            status: STORE_STATUS.success,
          })
        );
      }
    } catch (err) {
      setOpenSub({ title: "", open: false });
      dispatch(
        setAlert({
          message: MESSAGE_TEXT.createFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setMenuPageLoading(false));
      setSelectedCategories(undefined);
    }
  };

  // handle fetch detail sub categories
  const handleFetchDetailSubCategories = async (id: string) => {
    setOpenSub({ title: "Cập Nhật Danh Mục Nhỏ", open: true });
    try {
      const res = await CategoriesService.fetchDetailSubCategories(
        id,
        controller.signal
      );
      if (res.status === STATUS_CODE.success) {
        setDetailSubCategories(res.data.data);
      }
    } catch (err) {
      dispatch(
        setAlert({
          message: MESSAGE_TEXT.getDetailFaild,
          status: STORE_STATUS.error,
        })
      );
    }
  };

  // handle update sub categories
  const handleUpdateSubCategories = async (value: TSubCategoriesFormValue) => {
    dispatch(setMenuPageLoading(false));
    try {
      if (detailSubCategories) {
        const res = await CategoriesService.updateSubCategories(
          detailSubCategories.maDanhMucNho,
          value,
          controller.signal
        );
        if(res.status === STATUS_CODE.success) {
          setOpenSub({ title: "", open: false });
          dispatch(thunkFetMainCategories());
        }
      }
    } catch (err: Error | any) {
      setOpenSub({ title: "", open: false });
      dispatch(
        setAlert({
          message: MESSAGE_TEXT.updateFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setMenuPageLoading(false));
    }
  };

  // delete sub categories
  const handleDeleteSubCategories = async (id: string) => {
    dispatch(setMenuPageLoading(true));
    try {
      const res = await CategoriesService.deleteSubCategories(id, controller.signal);
      if(res.status === STATUS_CODE.success) {
        dispatch(thunkFetMainCategories());
      }
    } catch (err: Error | any) {
      dispatch(setAlert({message: err.response.data.message ?? MESSAGE_TEXT.deleteFaild, status: STORE_STATUS.error}));
    } finally {
      dispatch(setMenuPageLoading(false))
    }
  }

  return (
    <Card
      className="!px-0 h-auto"
      size="default"
      title="Category"
      style={{ borderRadius: 0 }}
      extra={[
        <Button
          onClick={() =>
            setOpenMain({ title: "Thêm Danh Mục Chính", open: true })
          }
          type="primary"
          key={"add-main-categories"}
        >
          Thêm danh mục chính
        </Button>,
      ]}
    >
      <div className="h-[600px] px-4 overflow-y-scroll">
        <Spin spinning={loading}>
          {categoriesList.length > 0 ? (
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {/* map categories List */}
              {categoriesList.map(
                (ele: IMainCategoriesFromBE, index: number) => (
                  <MainCategoriesItem
                    key={ele.maDanhMucChinh}
                    color={colorList[index]}
                    ribbon={`role: ${ele.role}`}
                    title={
                      <Space className="py-2 w-[620px] flex justify-between">
                        <Space className="flex gap-4 items-center">
                          <Image
                            preview={false}
                            className="bg-gray-300"
                            width={30}
                            height={30}
                            src={ele.icon ?? EMPTY_IMAGE}
                          />
                          <Text className="capitalize text-[16px]">
                            {ele.tenDanhMuc}
                          </Text>
                        </Space>
                        <Space className="flex items-center gap-4">
                          <EditOutlined
                            onClick={() =>
                              handleFetchDetailMainCategories(
                                ele.maDanhMucChinh
                              )
                            }
                            className="text-lg transition-all duration-300 hover:text-green-500 cursor-pointer"
                          />
                          <Popconfirm
                            title="Xác Nhận Xoá"
                            description="Có Chắc Bạn Muốn Xoá?"
                            onConfirm={() =>
                              handleDeleteMainCategories(ele.maDanhMucChinh)
                            }
                            okText="Có"
                            cancelText="Không"
                          >
                            <DeleteFilled className="text-lg transition-all duration-300 hover:text-red-500 cursor-pointer" />
                          </Popconfirm>
                          <Button
                            onClick={() => {
                              setSelectedCategories(ele);
                              setOpenSub({
                                title: "Thêm Danh Mục Nhỏ",
                                open: true,
                              });
                            }}
                            type="primary"
                          >
                            Thêm Danh Mục Nhỏ
                          </Button>
                        </Space>
                      </Space>
                    }
                  >
                    <SubCategoriesBox
                      onDelete={(id: string) => handleDeleteSubCategories(id)}
                      onUpdate={(id: string) =>
                        handleFetchDetailSubCategories(id)
                      }
                      itemsList={ele.subcategories}
                    />
                  </MainCategoriesItem>
                )
              )}
            </Space>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Spin>
      </div>

      {/* modal create */}
      <Modal
        title={openMain.title}
        open={openMain.open}
        onCancel={() => {
          setOpenMain({ ...openMain, open: false });
          detailMainCategories && setDetailMainCategories(undefined);
        }}
        footer={[]}
      >
        <Content className="py-4">
          {!detailMainCategories && (
            <MainCategoriesForm
              resetForm={openMain.open}
              roleList={categoriesList.map((ele) => ele.role)}
              getForm={(value: TCategoriesFormValue) =>
                handleCreateMainCategories(value)
              }
            />
          )}
          {detailMainCategories && (
            <MainCategoriesForm
              resetForm={openMain.open}
              defaultValue={detailMainCategories}
              roleList={categoriesList.map((ele) => ele.role)}
              getForm={(value: TCategoriesFormValue) =>
                handleUpdateMainCategories(
                  detailMainCategories.maDanhMucChinh,
                  value
                )
              }
            />
          )}
        </Content>
      </Modal>

      {/* sub modal */}
      <Modal
        title={openSub.title}
        open={openSub.open}
        onCancel={() => {
          setOpenSub({ ...openSub, open: false });
          detailSubCategories && setDetailSubCategories(undefined);
        }}
        footer={[]}
      >
        <Content className="py-4">
          {!detailSubCategories && (
            <SubCategoriesForm
              resetForm={openSub.open}
              selectedMainCategories={selectedCategories}
              mainCategoriesList={categoriesList}
              getForm={(value: TSubCategoriesFormValue) =>
                handleCreateSubCategories(value)
              }
            />
          )}
          {detailSubCategories && (
            <SubCategoriesForm
              defaultValue={detailSubCategories}
              resetForm={openSub.open}
              mainCategoriesList={categoriesList}
              getForm={(value: TSubCategoriesFormValue) =>
                handleUpdateSubCategories(value)
              }
            />
          )}
        </Content>
      </Modal>
    </Card>
  );
};

export default CategoryBox;

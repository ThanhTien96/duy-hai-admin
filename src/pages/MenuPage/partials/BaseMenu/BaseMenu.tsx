import {
  Button,
  Card,
  Empty,
  Image,
  Modal,
  Popconfirm,
  Space,
  Spin,
  Tabs,
  Tooltip,
  Typography,
} from "antd";
import { TMenuFromBE, TNavLinkFromBE, TSubNavLinkFromBE } from "types/Menu";
import { useState } from "react";
import { truncateText } from "utils/truncateText";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { NavLinkForm, SubLinkForm } from "./partials";
import { TFormValue } from "./partials/NavLinkForm";
import { useAppDispatch, useAppSelector } from "store";
import { setMenuPageLoading } from "store/common/menu/menu";
import MenuService from "services/menuRequester";
import { STATUS_CODE } from "constants";
import { thunkFetchMenu } from "store/common/menu/menuAsyncThunk";
import { setAlert } from "store/app/alert";
import { TSubLinkValue } from "./partials/SubLinkForm";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import { UploadImage } from "components/shared";
import { TUploadProps } from "components/shared/UploadImage";

const { Text } = Typography;

export type TBaseMenuProps = {
  menu?: TMenuFromBE;
};

export type StatusForm = "create" | "update";

const BaseMenu = ({ menu }: TBaseMenuProps) => {
  const { loading } = useAppSelector((state) => state.common.menu);
  const [detailNavlink, setDetailNavLink] = useState<TNavLinkFromBE>();
  const [detailSubLink, setDetailSubLink] = useState<TSubNavLinkFromBE>();
  const [logo, setLogo] = useState<File>();
  // logo state
  const [openLogoModal, setOpenLogoModal] = useState<boolean>(false);
  // menu modal state
  const [openModal, setOpenModal] = useState<{
    open: boolean;
    title: string;
    status: StatusForm;
  }>({
    title: "Thêm Menu",
    open: false,
    status: "create",
  });
  // sub menu modal state
  const [openSubModal, setOpenSubModal] = useState<{
    open: boolean;
    title: string;
    status: StatusForm;
  }>({
    title: "Thêm Sub  Menu",
    open: false,
    status: "create",
  });
  const controller = new AbortController();

  // fetch detail navlink
  const fetDetailNavLink = async (id: string) => {
    dispatch(setMenuPageLoading(true));
    try {
      const res = await MenuService.fetchDetailNavLink(id, controller.signal);
      if (res.status === STATUS_CODE.success) {
        setDetailNavLink(res.data.data);
        setOpenModal({ title: "Cập Nhật Menu", status: "update", open: true });
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

  const dispatch = useAppDispatch();

  // create navlink
  const handleCreateNavLink = async (value: TFormValue) => {
    dispatch(setMenuPageLoading(true));
    try {
      const res = await MenuService.createNavLink(value, controller.signal);
      if (res.status === STATUS_CODE.success) {
        setOpenModal({ ...openModal, open: false });
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.createSuccess,
            status: STORE_STATUS.success,
          })
        );
        dispatch(thunkFetchMenu());
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.createFaild,
          status: STORE_STATUS.error,
        })
      );
      setOpenModal({ ...openModal, open: false });
    } finally {
      dispatch(setMenuPageLoading(false));
    }
  };

  // update navlink
  const handleUpdateNavlink = async (id: string, value: TFormValue) => {
    dispatch(setMenuPageLoading(true));
    setOpenModal({ ...openModal, open: false });
    try {
      const res = await MenuService.updateNavLink(id, value, controller.signal);
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.updateSuccess,
            status: STORE_STATUS.success,
          })
        );
        dispatch(thunkFetchMenu());
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: MESSAGE_TEXT.updateFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      setDetailNavLink(undefined);
      dispatch(setMenuPageLoading(false));
    }
  };

  // handle delete navlink
  const handleDeleteNavLink = async (id: string) => {
    dispatch(setMenuPageLoading(true));
    try {
      const res = await MenuService.deleteNavLink(id, controller.signal);
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.deleteSuccess,
            status: STATUS_CODE.success,
          })
        );
        dispatch(thunkFetchMenu());
      }
    } catch (err) {
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

  /**** sub link handler ****/
  // create sub link
  const handleCreateSubLink = async (data: TSubLinkValue) => {
    dispatch(setMenuPageLoading(true));
    try {
      const res = await MenuService.createSubLink(data, controller.signal);

      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.createSuccess,
            status: STORE_STATUS.success,
          })
        );
        setOpenSubModal({ ...openSubModal, open: false });
        dispatch(thunkFetchMenu());
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.createFaild,
          status: STORE_STATUS.error,
        })
      );
      setOpenSubModal({ ...openSubModal, open: false });
    } finally {
      dispatch(setMenuPageLoading(false));
    }
  };

  // update sub link
  // fetch detail sub link
  const fetDetailSublink = async (id: string) => {
    try {
      const res = await MenuService.fetchDetailSubLink(id, controller.signal);
      if (res.status === STATUS_CODE.success) {
        setDetailSubLink(res.data.data);
        setOpenSubModal({
          title: "Cập nhật sub menu",
          status: "update",
          open: true,
        });
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: MESSAGE_TEXT.getDetailFaild,
          status: STORE_STATUS.error,
        })
      );
    }
  };

  // update sublink
  const handleUpdateSubLink = async (id: string, value: TSubLinkValue) => {
    dispatch(setMenuPageLoading(true));
    try {
      const res = await MenuService.updateSubLink(id, value, controller.signal);
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.updateSuccess,
            status: STORE_STATUS.success,
          })
        );
        setOpenSubModal({ ...openSubModal, open: false });
        dispatch(thunkFetchMenu());
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.updateFaild,
          status: STORE_STATUS.error,
        })
      );
      setOpenSubModal({ ...openSubModal, open: false });
    } finally {
      dispatch(setMenuPageLoading(true));
      setDetailSubLink(undefined);
    }
  };

  // handle delete sub link
  const handleDeleteSubLink = async (id: string) => {
    dispatch(setMenuPageLoading(true));
    try {
      const res = await MenuService.deleteSubLink(id, controller.signal);
      if (res.status === STATUS_CODE.success) {
        dispatch(thunkFetchMenu());
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.deleteFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setMenuPageLoading(false));
    }
  };

  // update logo
  const handleUpdateLogo = async (id: string, file: File) => {
    dispatch(setMenuPageLoading(true));
    const formData = new FormData();
    formData.append("logo", file);
    try {
      const res = await MenuService.updateMenu(id, formData, controller.signal);
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.updateSuccess,
            status: STORE_STATUS.success,
          })
        );
        dispatch(thunkFetchMenu());
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
      setOpenLogoModal(false);
      setLogo(undefined);
    }
  };

  return (
    <Card
      size="default"
      title="Menu"
      style={{ borderRadius: 0 }}
      extra={[
        <Button
          onClick={() =>
            setOpenModal({ status: "create", open: true, title: "Thêm Menu" })
          }
          key={"action-add-menu"}
          type="primary"
        >
          Thêm Menu
        </Button>,
        <Button
          onClick={() =>
            setOpenSubModal({
              status: "create",
              open: true,
              title: "Thêm sub Menu",
            })
          }
          key={"action-add-sub-menu"}
          type="primary"
          className="ml-4"
        >
          Thêm Sub Menu
        </Button>,
      ]}
    >
      <div className="h-[600px] px-4 overflow-y-scroll">
        <Spin spinning={loading}>
          {menu ? (
            <Tabs
              defaultActiveKey="menu"
              tabPosition={"left"}
              items={[
                {
                  label: <p className="font-bold">Logo</p>,
                  key: "logo",
                  children: (
                    <Space className="flex items-center justify-center flex-col">
                      <Image
                        loading="lazy"
                        className="w-[200px] h-[200px] rounded-full "
                        src={menu && menu.logo}
                      />
                      <Button
                        onClick={() => setOpenLogoModal(true)}
                        icon={<EditFilled />}
                      />
                    </Space>
                  ),
                },
                {
                  label: <p className="font-bold">Menu</p>,
                  key: "menu",
                  // tab children (sub menu)
                  children: (
                    <Tabs
                      tabPosition="left"
                      items={menu?.navlink.map(
                        (ele: TNavLinkFromBE, i: number) => ({
                          label: (
                            <Space className="capitalize flex items-center justify-between gap-4 w-[250px]">
                              <Tooltip title={ele.tenNavLink}>
                                <p className="font-bold">
                                  {truncateText(ele.tenNavLink, 20)}
                                </p>
                              </Tooltip>

                              <Space className="flex items-center gap-4">
                                <EditFilled
                                  onClick={() =>
                                    fetDetailNavLink(ele.maNavLink)
                                  }
                                  className="hover:text-green-500 transition-all duration-300"
                                />
                                <Popconfirm
                                  title="Xác Nhận Xoá"
                                  description="Bạn có chắc là muốn xoá menu?"
                                  onConfirm={() =>
                                    handleDeleteNavLink(ele.maNavLink)
                                  }
                                  okText="Có"
                                  cancelText="Không"
                                >
                                  <DeleteFilled className="hover:text-red-500 transition-all duration-300" />
                                </Popconfirm>
                              </Space>
                            </Space>
                          ),
                          key: ele.maNavLink,
                          children:
                            ele.subLink.length > 0 ? (
                              ele.subLink.map(
                                (subLink: TSubNavLinkFromBE, index: number) => (
                                  <Space
                                    key={subLink.id}
                                    className="py-4 flex items-center justify-between gap-8 w-full"
                                  >
                                    <Text className="capitalize">
                                      {subLink.tenSubLink}
                                    </Text>
                                    <Space className="flex items-center gap-4">
                                      <EditFilled
                                        onClick={() =>
                                          fetDetailSublink(subLink.id)
                                        }
                                        className="hover:text-green-500 transition-all duration-300 cursor-pointer"
                                      />
                                      <Popconfirm
                                        title="Xác Nhận Xoá"
                                        description="Bạn có chắc là muốn xoá sub menu?"
                                        onConfirm={() =>
                                          handleDeleteSubLink(subLink.id)
                                        }
                                        okText="Có"
                                        cancelText="Không"
                                      >
                                        <DeleteFilled className="hover:text-red-500 transition-all duration-300 cursor-pointer" />
                                      </Popconfirm>
                                    </Space>
                                  </Space>
                                )
                              )
                            ) : (
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            ),
                        })
                      )}
                    />
                  ),
                },
              ]}
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
          {/* menu modal */}
          <Modal
            title={openModal.title}
            open={openModal.open}
            onCancel={() => {
              setOpenModal({ ...openModal, open: false });
              setDetailNavLink(undefined);
            }}
            footer={[]}
          >
            {!detailNavlink && (
              <NavLinkForm
                getForm={(value: TFormValue) => handleCreateNavLink(value)}
              />
            )}
            {detailNavlink && (
              <NavLinkForm
                defaultValue={detailNavlink}
                getForm={(value: TFormValue) =>
                  handleUpdateNavlink(detailNavlink.maNavLink, value)
                }
              />
            )}
          </Modal>

          {/* sub menu */}
          <Modal
            title={openSubModal.title}
            open={openSubModal.open}
            onCancel={() => {
              setOpenSubModal({ ...openSubModal, open: false });
            }}
            footer={[]}
          >
            {!detailSubLink && (
              <SubLinkForm
                getForm={(value: TSubLinkValue) => handleCreateSubLink(value)}
              />
            )}
            {detailSubLink && (
              <SubLinkForm
                defaultValue={detailSubLink}
                getForm={(value: TSubLinkValue) =>
                  handleUpdateSubLink(detailSubLink.id, value)
                }
              />
            )}
          </Modal>

          {/* update logo */}
          <Modal
            title={"Cập Nhật Logo"}
            open={openLogoModal}
            onCancel={() => {
              setOpenLogoModal(false);
            }}
            footer={[
              <Button
                key={"upload-action"}
                onClick={() => {
                  if (menu && logo) {
                    handleUpdateLogo(menu.maMenu, logo);
                  }
                }}
                type="primary"
              >
                Cập nhật
              </Button>,
            ]}
          >
            <UploadImage
              resetFile={logo ? false : true}
              filesQuantity={1}
              getfiles={(files: TUploadProps) =>
                files && setLogo(files[0].originFileObj)
              }
            />
          </Modal>
        </Spin>
      </div>
    </Card>
  );
};

export default BaseMenu;

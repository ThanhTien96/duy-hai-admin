import { Button, Drawer, Spin } from "antd";
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT, STATUS_CODE } from "constants";
import React, { useCallback, useEffect, useState } from "react";
import { FixPostForm, SupportForm, SupportPostList } from "./partials";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { FaFileCirclePlus } from "react-icons/fa6";
import { IFixPostPayload, ISupportPostPayload } from "types/Blog";
import { useAppDispatch, useAppSelector } from "store";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import {
  resetFixPost,
  resetSupportPost,
  setBlogLoading,
} from "store/common/blog/blogSlice";
import { BlogRequester } from "services";
import {
  thunkFetchAllFixPost,
  thunkFetchAllSupportPost,
  thunkFetchFixPostDetail,
  thunkFetchSupportPostDetail,
} from "store/common/blog/blogAsyncThunk";
import FixPostList from "./partials/FixPostList";

const BlogPage: React.FC = () => {
  const controller = new AbortController();
  const [currentTab, setCurrentTab] = useState<string>("1");
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openFixPostForm, setOpenFixPostForm] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { loading, supportPostList, supportPost, fixPostList, fixPost } = useAppSelector(
    (state) => state.common.blog
  );

  useEffect(() => {
    dispatch(thunkFetchAllSupportPost());
    dispatch(thunkFetchAllFixPost());
    return () => {
      controller.abort();
    };
  }, []);

  //   handle change tab
  const handleChangeTab = (key: string) => {
    setCurrentTab(key);
  };

  // hadle add support post
  const handleAddSupportPost = useCallback(
    async (value: ISupportPostPayload) => {
      dispatch(setBlogLoading(false));
      try {
        const res = await BlogRequester.createSupportPost(
          value,
          controller.signal
        );
        if (res.status === STATUS_CODE.success) {
          dispatch(
            setAlert({
              message: MESSAGE_TEXT.createSuccess,
              status: STORE_STATUS.success,
            })
          );
          setOpenForm(false);
          dispatch(thunkFetchAllSupportPost());
        }
      } catch (err: Error | any) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.createFaild,
            status: STORE_STATUS.error,
          })
        );
      } finally {
        dispatch(setBlogLoading(false));
      }
    },
    []
  );

  // handle delete suport post
  const handleDeleteSupportPost = useCallback(async (id: string) => {
    dispatch(setBlogLoading(true));
    try {
      const res = await BlogRequester.deleteSupportPost(id, controller.signal);
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.deleteSuccess,
            status: STORE_STATUS.success,
          })
        );
        dispatch(thunkFetchAllSupportPost());
      }
    } catch (error: Error | any) {
      dispatch(
        setAlert({
          message: MESSAGE_TEXT.deleteFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setBlogLoading(false));
    }
  }, []);

  // handle update
  const handleUpdate = async (id: string) => {
    await dispatch(thunkFetchSupportPostDetail(id));
    setOpenForm(true);
  };

  // handle update post
  const handleUpdatePost = useCallback(
    async (value: Partial<ISupportPostPayload>) => {
      if (!supportPost) return;
      dispatch(setBlogLoading(true));
      try {
        const res = await BlogRequester.updateSupportPost(
          supportPost?.id,
          value,
          controller.signal
        );
        if (res.status === STATUS_CODE.success) {
          dispatch(
            setAlert({
              message: MESSAGE_TEXT.updateSuccess,
              status: STORE_STATUS.success,
            })
          );
          dispatch(thunkFetchAllSupportPost());
          setOpenForm(false);
          dispatch(resetSupportPost());
        }
      } catch (err: Error | any) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.updateFaild,
            status: STORE_STATUS.error,
          })
        );
      } finally {
        dispatch(setBlogLoading(false));
      }
    },
    []
  );

  /** FIX POST HANDLE */
  // create fix post
  const handleCreateFixPost = async (value: IFixPostPayload) => {
    dispatch(setBlogLoading(true));
    const formData = new FormData();

    formData.append("tieuDe", value.tieuDe);
    formData.append("noiDung", value.noiDung);
    if (value.tenKySu) {
      formData.append("tenKySu", value.tenKySu);
    }
    if (value.hinhAnh && Array.isArray(value.hinhAnh)) {
      value.hinhAnh?.forEach((ele: any) => {
        formData.append("hinhAnh", ele.originFileObj);
      });
    }
    try {
      const res = await BlogRequester.createFixPost(
        formData,
        controller.signal
      );
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.createSuccess,
            status: STORE_STATUS.success,
          })
        );
        setOpenFixPostForm(false);
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: MESSAGE_TEXT.createFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setBlogLoading(false));
    }
  };

  // handle delete
  const handleDeleteFixPost = useCallback(async (id: string) => {
    dispatch(setBlogLoading(true));
    try {
      const res = await BlogRequester.deleteFixPost(id, controller.signal);
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.deleteSuccess,
            status: STORE_STATUS.success,
          })
        );
        dispatch(thunkFetchAllFixPost());
      }
    } catch (error: Error | any) {
      dispatch(
        setAlert({
          message: MESSAGE_TEXT.deleteFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setBlogLoading(false));
    }
  }, []);

  // handle update
  const handleUpdateFixPost = async (id: string) => {
    await dispatch(thunkFetchFixPostDetail(id));
    setOpenFixPostForm(true);
  };

  // handle update post
  const handleUpdateFixPostServer = useCallback(
    async (value: IFixPostPayload) => {
      if (!fixPost) return;
      dispatch(setBlogLoading(true));
      const formData = new FormData();

      if (value.tieuDe) {
        formData.append("tieuDe", value.tieuDe);
      }
      if (value.noiDung) {
        formData.append("noiDung", value.noiDung);
      }
      if (value.tenKySu) {
        formData.append("tenKySu", value.tenKySu);
      }
      if (value.hinhAnh && Array.isArray(value.hinhAnh)) {
        value.hinhAnh?.forEach((ele: any) => {
          formData.append("hinhAnh", ele.originFileObj);
        });
      }

      try {
        const res = await BlogRequester.updateFixPost(
          fixPost?.maBaiViet,
          formData,
          controller.signal
        );
        if (res.status === STATUS_CODE.success) {
          dispatch(
            setAlert({
              message: MESSAGE_TEXT.updateSuccess,
              status: STORE_STATUS.success,
            })
          );
          dispatch(thunkFetchAllFixPost());
          setOpenFixPostForm(false);
          dispatch(resetFixPost());
        }
      } catch (err: Error | any) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.updateFaild,
            status: STORE_STATUS.error,
          })
        );
      } finally {
        dispatch(setBlogLoading(false));
      }
    },
    []
  );

  // tab
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Bài Viết Chính Sách",
      children: (
        <SupportPostList
          onUpdate={(id) => handleUpdate(id)}
          onDelete={(id) => handleDeleteSupportPost(id)}
          postList={supportPostList}
        />
      ),
    },
    {
      key: "2",
      label: "Bài Viết Hướng Dẫn",
      children: (
        <FixPostList
          onDelete={(id) => handleDeleteFixPost(id)}
          onUpdate={(id) => handleUpdateFixPost(id)}
          postList={fixPostList}
        />
      ),
    },
  ];

  return (
    <PlainLayout
      headerprops={{
        title: "Bài Viết Hỗ Trợ",
        extra: [
          <Button
            key={"button-add-post"}
            onClick={() => {
              if (currentTab === "1") {
                setOpenForm((current) => !current);
              } else {
                setOpenFixPostForm((current) => !current);
              }
            }}
            type="primary"
            className="capitalize flex items-center justify-between"
            icon={<FaFileCirclePlus />}
          >
            Thêm Bài Viết
          </Button>,
        ],
        className: "mt-4",
      }}
      footerprops={{
        children: COPY_RIGHT,
        className: "text-center",
      }}
      className="bg-inherit"
    >
      <Spin spinning={loading}>
        <Tabs
          defaultActiveKey={currentTab}
          items={items}
          onChange={handleChangeTab}
        />
        {/* support post drawer */}
        <Drawer
          title="Đăng Bài"
          width={"50%"}
          open={openForm}
          onClose={() => {
            setOpenForm(false);
            dispatch(resetSupportPost());
          }}
          className="relative"
        >
          <SupportForm
            defaultVal={supportPost}
            onSubmit={(value) => {
              if (!supportPost) {
                handleAddSupportPost(value);
              } else {
                handleUpdatePost(value);
              }
            }}
          />
        </Drawer>

        {/* support post drawer */}
        <Drawer
          title="Đăng Bài"
          width={"50%"}
          open={openFixPostForm}
          onClose={() => {
            dispatch(resetFixPost());
            setOpenFixPostForm(false);
          }}
          className="relative"
        >
          <FixPostForm defaultVal={fixPost} onSubmit={(value) => {
            if(!fixPost) {
              handleCreateFixPost(value)
            } else {
              handleUpdateFixPostServer(value);
            }
          }} />
        </Drawer>
      </Spin>
    </PlainLayout>
  );
};

export default BlogPage;

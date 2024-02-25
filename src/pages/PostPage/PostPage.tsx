import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { useEffect, useCallback } from "react";
import {
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  Flex,
  Pagination,
  Row,
  Spin,
  Typography,
} from "antd";
import { COPY_RIGHT, PAGE_SIZE, STATUS_CODE, pagePaths } from "constants";
import React, { useState } from "react";
import { HomeOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { NewsForm, NewsType } from "./partials";
import { INewsPostFromBE } from "types/Post";
import { PostService } from "services";
import { TPostFormValue } from "./partials/NewsForm";
import { useAppDispatch, useAppSelector } from "store";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import NewsItem from "./partials/NewsItem";
import moment from "moment";
import {
  thunkFetchAllNews,
  thunkFetchNewsType,
} from "store/common/news/newsAsyncThunk";
import { useNavigate } from "react-router";
import { setNewsLoading } from "store/common/news/newsSlice";
const { Text } = Typography;

const PostPage: React.FC = () => {
  const controller = new AbortController();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    pageLoading: loading,
    newsList,
    pagination,
  } = useAppSelector((state) => state.common.news);
  const [openForm, setOpenForm] = useState<boolean>(false);

  // fetch news
  const handleFetchAllNews = useCallback(
    async (page: number, perPage?: number, keyWord?: string) => {
      try {
        await dispatch(thunkFetchAllNews({ page, perPage, keyWord }));
      } catch (err: Error | any) {
        dispatch(
          setAlert({
            message: err.response.data.message || MESSAGE_TEXT.getAllFail,
            status: STORE_STATUS.error,
          })
        );
      }
    },
    []
  );

  useEffect(() => {
    dispatch(thunkFetchNewsType());
    handleFetchAllNews(1);
  }, []);

  // handle create news
  const handleCreateNews = async (data: TPostFormValue) => {
    dispatch(setNewsLoading(true));
    const formData = new FormData();
    formData.append("tieuDe", data.tieuDe);
    formData.append("noiDungNgan", data.noiDungNgan);
    formData.append("maLoaiTinTuc", data.maLoaiTinTuc);
    formData.append("noiDung", data.noiDung);
    formData.append("maNguoiDang", "f6d99c99-83f1-49ac-a685-0c959f86fedd");
    if (data.hinhAnh) {
      data.hinhAnh.forEach((ele: any) => {
        formData.append("hinhAnh", ele.originFileObj);
      });
    }
    try {
      const res = await PostService.createNews(formData, controller.signal);

      if (res.status === STATUS_CODE.success) {
        setOpenForm(false);
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.createSuccess,
            status: STORE_STATUS.success,
          })
        );
        dispatch(thunkFetchAllNews({ page: 1 }));
      }
    } catch (error: Error | any) {
      dispatch(
        setAlert({
          message: error.response.data.message ?? MESSAGE_TEXT.createFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setNewsLoading(false));
    }
  };

  // handle delete news
  const handleDeleteNews = async (id: string) => {
    dispatch(setNewsLoading(true));
    try {
      const res = await PostService.deleteNews(id);

      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.deleteSuccess,
            status: STORE_STATUS.success,
          })
        );
        dispatch(thunkFetchAllNews({ page: 1 }));
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.deleteFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setNewsLoading(false));
    }
  };

  return (
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
        title: "Tin Tức",
      }}
      footerprops={{ children: COPY_RIGHT, className: "text-center " }}
      className="bg-inherit"
    >
      <Spin spinning={loading}>
        <Content className="px-8">
          <Flex justify="end">
            {/* navigator */}
            <Button
              onClick={() => setOpenForm(true)}
              type="primary"
              icon={<AppstoreAddOutlined />}
            >
              {" "}
              Thêm Tin Tức
            </Button>
          </Flex>
          {/* main content */}
          <Row gutter={[32, 32]} className="mt-8 relative">
            {/* Column left */}
            <Col span={24} xl={6}>
              <NewsType className="sticky top-0" />
            </Col>
            <Col span={24} xl={18}>
              <Card className="rounded-md">
                <Row gutter={[32, 32]}>
                  {newsList &&
                  Array.isArray(newsList) &&
                  newsList.length > 0 ? (
                    <>
                      {newsList.map((ele: INewsPostFromBE) => (
                        <Col key={ele.maTinTuc} span={24} xl={12}>
                          <NewsItem
                            onDelete={() => handleDeleteNews(ele.maTinTuc)}
                            onClick={() =>
                              navigate(
                                `/${pagePaths.news}/${pagePaths.newsDetail}/${ele.maTinTuc}`
                              )
                            }
                            title={ele.tieuDe}
                            content={ele.noiDungNgan}
                            media={ele.hinhAnh[0].hinhAnh}
                            date={moment(ele.createAt).format(
                              "dddd dd/mm/yyyy"
                            )}
                          />
                        </Col>
                      ))}
                      <Col className="text-center" span={24}>
                        <Pagination
                          onChange={(e) => handleFetchAllNews(e)}
                          defaultCurrent={1}
                          total={pagination?.total}
                          pageSize={PAGE_SIZE.news}
                        />
                      </Col>
                    </>
                  ) : (
                    <Col span={24} className="text-center">
                      <Empty className="text-center" />
                    </Col>
                  )}
                </Row>
              </Card>
            </Col>
          </Row>

          {/* Drawer */}
          <Drawer
            open={openForm}
            onClose={() => setOpenForm(false)}
            title="Thêm Tin Tức"
            width={"40%"}
          >
            <NewsForm
              resetForm={openForm}
              onSubmit={(value) => handleCreateNews(value)}
            />
          </Drawer>
        </Content>
      </Spin>
    </PlainLayout>
  );
};

export default PostPage;

import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  Flex,
  Image,
  Row,
  Spin,
  Typography,
} from "antd";
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT, EMPTY_IMAGE, STATUS_CODE, pagePaths } from "constants";
import React, { useEffect, useReducer } from "react";
import { HomeOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { useAppDispatch } from "store";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import { PostService } from "services";
import { useParams } from "react-router";
import { INewsPostFromBE, TNewsPostMedia } from "types/Post";
import Meta from "antd/es/card/Meta";
import moment from "moment";
import { NewsForm } from "../partials";
import { setNewsLoading } from "store/common/news/newsSlice";
import { TPostFormValue } from "../partials/NewsForm";

const { Text, Title } = Typography;

enum NewsReducerEnum {
  FETCH_DETAIL = "fetch_detail",
  LOADING = "loading",
  OPEN_DRAWER = "open_drawer",
}

interface INewsAction {
  type: NewsReducerEnum;
  payload: any;
}

export interface INewsReducer {
  data?: INewsPostFromBE;
  loading?: boolean;
  openDrawer?: boolean;
}

function newsReducer(
  state: INewsReducer,
  action: INewsAction
): Partial<INewsReducer> {
  const { type, payload } = action;
  switch (type) {
    case NewsReducerEnum.FETCH_DETAIL:
      return { ...state, data: payload };

    case NewsReducerEnum.LOADING:
      return { ...state, loading: payload };

    case NewsReducerEnum.OPEN_DRAWER:
      return { ...state, openDrawer: payload };

    default:
      return state;
  }
}

const PostDetail: React.FC = () => {
  const storeDispatch = useAppDispatch();
  const params = useParams();
  const [state, dispatch] = useReducer(newsReducer, {
    data: undefined,
    loading: false,
    openDrawer: false,
  });

  // fetch news detail
  const handleFetchNewsDetail = async (id: string, signal?: AbortSignal) => {
    dispatch({ type: NewsReducerEnum.LOADING, payload: true });
    try {
      const res = await PostService.fetchNewsDetail(id, signal);

      if (res.status === STATUS_CODE.success) {
        dispatch({
          type: NewsReducerEnum.FETCH_DETAIL,
          payload: res.data.data,
        });
      }
    } catch (err: Error | any) {
      storeDispatch(
        setAlert({
          message: MESSAGE_TEXT.getDetailFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch({ type: NewsReducerEnum.LOADING, payload: false });
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    if (params.id) {
      handleFetchNewsDetail(params.id, controller.signal);
    }

    return () => {
      controller.abort();
    };
  }, []);

  // handle update news
  const handleUpdateNews = async (value: TPostFormValue) => {
    storeDispatch(setNewsLoading(true))
    const formData = new FormData();
    formData.append("tieuDe", value.tieuDe);
    formData.append("noiDungNgan", value.noiDungNgan);
    formData.append("maLoaiTinTuc", value.maLoaiTinTuc);
    formData.append("noiDung", value.noiDung);
    formData.append("maNguoiDang", "f6d99c99-83f1-49ac-a685-0c959f86fedd");
    if (value.hinhAnh) {
      value.hinhAnh.forEach((ele: any) => {
        formData.append("hinhAnh", ele.originFileObj);
      });
    }
    try {
      if(params.id) {
        const res = await PostService.updateNews(params.id, formData);
        if(res.status === STATUS_CODE.success) {
          storeDispatch(setAlert({message: MESSAGE_TEXT.updateSuccess, status: STORE_STATUS.success}));
          handleFetchNewsDetail(params.id)
          dispatch({type: NewsReducerEnum.OPEN_DRAWER, payload: false})
        }
      }
    } catch(err: Error | any) {
      storeDispatch(setAlert({message: err.response.data.message ?? MESSAGE_TEXT.updateFaild, status: STORE_STATUS.error}))
    } finally {
      storeDispatch(setNewsLoading(false))
    }
  } 

  return (
    <PlainLayout
      headerprops={{
        title: "Trang Chi Tiết Tin Tức",
      }}
      footerprops={{ children: COPY_RIGHT, className: "text-center " }}
      className="bg-inherit"
    >
      <Flex justify="space-between">
        {/* navigator */}
        <Breadcrumb
          className="mb-4"
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: `/${pagePaths.news}`,
              title: <Text>{pagePaths.news}</Text>,
            },
            {
              title: <Text>{location.pathname.split("/")[2]}</Text>,
            },
          ]}
        />
        <Button
          onClick={() => {
            dispatch({ type: NewsReducerEnum.OPEN_DRAWER, payload: true });
          }}
          type="primary"
          icon={<AppstoreAddOutlined />}
        >
          {" "}
          Chỉnh Sửa
        </Button>
      </Flex>
      {/* content */}
      <Spin spinning={state.loading}>
        {state.data ? (
          <Row className="mt-4" gutter={[32, 32]}>
            <Col span={24} xl={12}>
              <Card>
                <Image
                  className="object-bottom"
                  width={"100%"}
                  height={400}
                  loading="lazy"
                  src={
                    state.data && state.data.hinhAnh.length > 0
                      ? state.data.hinhAnh[0].hinhAnh
                      : EMPTY_IMAGE
                  }
                />
                {state.data && state.data.hinhAnh.length > 1 && (
                  <div className="flex gap-4 items-center mt-4">
                    {state.data &&
                      state.data.hinhAnh.length > 0 &&
                      state.data.hinhAnh
                        .slice(1)
                        .map((ele: TNewsPostMedia) => (
                          <Image
                            width={250}
                            height={150}
                            key={ele.id}
                            src={ele.hinhAnh}
                            alt="nong co hai tra tan"
                          />
                        ))}
                  </div>
                )}
              </Card>
            </Col>
            <Col span={24} xl={12}>
              <Card>
                <div className="mb-4 text-right">
                  <Meta
                    description={moment(state.data?.createAt).format(
                      "dddd DD-MM-YYYY"
                    )}
                  />
                </div>
                <Title level={2} className="!text-[18px]">
                  {state.data?.tieuDe}
                </Title>
                <Meta
                  className="!mt-4"
                  title="Mô Tả Ngắn: "
                  description={state.data?.noiDungNgan}
                />
                <div
                  className="mt-8"
                  dangerouslySetInnerHTML={{
                    __html: state.data?.noiDung ?? "",
                  }}
                ></div>
              </Card>
            </Col>
          </Row>
        ) : (
          <Empty />
        )}
      </Spin>
      {/* edit form  */}
      <Drawer
        title="Sửa Tin Tức"
        width={"40%"}
        open={state.openDrawer}
        onClose={() => {
          dispatch({ type: NewsReducerEnum.OPEN_DRAWER, payload: false });
        }}
      >
        <NewsForm resetForm={state.openDrawer} onSubmit={(e) => handleUpdateNews(e)} defaultValue={state.data} />
      </Drawer>
    </PlainLayout>
  );
};

export default PostDetail;

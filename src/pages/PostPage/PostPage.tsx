import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { useEffect } from "react";
import { Breadcrumb, Button, Col, Flex, Row, Spin, Typography } from "antd";
import { COPY_RIGHT, STATUS_CODE } from "constants";
import React, { useContext, createContext, useState } from "react";
import { HomeOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { Drawer } from "components/shared";
import SharedContext from "components/wrapper/SharedProvider/SharedContext";
import { useAppDispatch } from "store";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import { PostService } from "services";
import { NewsType } from "./partials";
import { INewsTypeFormBE } from "types/Post";
const { Text } = Typography;

export interface IPostState {
  newsTypeList: INewsTypeFormBE[];
  pageLoading?: boolean;
}

export type TPostContextProvider = [
  IPostState,
  React.Dispatch<React.SetStateAction<IPostState>>
];

export const PostContext = createContext<TPostContextProvider>(null as any);

const PostPage: React.FC = () => {
  const controller = new AbortController();

  const dispatch = useAppDispatch();
  const [state, setState] = useContext(SharedContext);
  const [post, setPost] = useState<IPostState>({
    newsTypeList: [],
    pageLoading: false,
  });

  // fetch new type
  const handleFetchNewsType = async (signal?: AbortSignal) => {
    try {
      const res = await PostService.getAllNewsType(signal);
      console.log("☣️ >>> handleFetchNewsType >>> res: ", res);
      if (res.status === STATUS_CODE.success) {
        setPost({ ...post, newsTypeList: res.data.data });
      }
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    handleFetchNewsType(controller.signal);
  }, []);

  // handle create news type
  const handleCreateNewsType = async (data: { loaiTinTuc: string }) => {
    setPost({ ...post, pageLoading: true });
    try {
      const res = await PostService.createNewsType(data, controller.signal);
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.createSuccess,
            status: STORE_STATUS.success,
          })
        );
        handleFetchNewsType(controller.signal);
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.createFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      setPost({ ...post, pageLoading: false });
    }
  };

  return (
    <PlainLayout
      headerprops={{
        title: "Trang Tin Tức",
      }}
      footerprops={{ children: COPY_RIGHT, className: "text-center " }}
      className="bg-inherit"
    >
      <PostContext.Provider value={[post, setPost]}>
        <Spin spinning={post.pageLoading}>
          <Content className="px-8">
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
                    title: <Text>{location.pathname.replace("/", "")}</Text>,
                  },
                ]}
              />
              <Button
                onClick={() => setState({ drawer: { open: true } })}
                type="primary"
                icon={<AppstoreAddOutlined />}
              >
                {" "}
                Thêm Tin Tức
              </Button>
            </Flex>
            {/* main content */}
            <Row gutter={[32, 32]}>
              {/* Column left */}
              <Col span={24} xl={6}>
                <NewsType onCreateNewsType={handleCreateNewsType} />
              </Col>
            </Row>

            {/* Drawer */}
            <Drawer open={true} />
          </Content>
        </Spin>
      </PostContext.Provider>
    </PlainLayout>
  );
};

export default PostPage;

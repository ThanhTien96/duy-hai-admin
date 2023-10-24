import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { useEffect, useCallback } from "react";
import { Breadcrumb, Button, Col, Flex, Row, Spin, Typography } from "antd";
import { COPY_RIGHT, STATUS_CODE } from "constants";
import React, { useContext, createContext, useState } from "react";
import { HomeOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { Drawer } from "components/shared";
import SharedContext from "components/wrapper/SharedProvider/SharedContext";
import { NewsForm, NewsType } from "./partials";
import { INewsTypeFormBE } from "types/Post";
import { PostService } from "services";
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
  const [state, setState] = useContext(SharedContext);
  console.log("☣️ >>> state: ", state)
  const [post, setPost] = useState<IPostState>({
    newsTypeList: [],
    pageLoading: false,
  });

  // fetch new type
  const handleFetchNewsType = useCallback(
    async (signal?: AbortSignal) => {
      try {
        const res = await PostService.getAllNewsType(signal);
        if (res.status === STATUS_CODE.success) {
          setPost({ ...post, newsTypeList: res.data.data });
        }
      } catch (err) {
        /* empty */
      }
    },
    [],
  )
  ;

  useEffect(() => {
    handleFetchNewsType(controller.signal);
  }, []);

  

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
                onClick={() => setState({...state, drawer: {open: true}})}
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
                <NewsType fetchNewsType={handleFetchNewsType} />
              </Col>
              <Col span={24} xl={6}></Col>
            </Row>

            {/* Drawer */}
            <Drawer width={"40%"} children={<NewsForm />} open={true} />
          </Content>
        </Spin>
      </PostContext.Provider>
    </PlainLayout>
  );
};

export default PostPage;

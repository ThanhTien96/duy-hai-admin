import { Col, Row } from "antd";
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT } from "constants";
import useHelmet from "hooks/useHelmet";
import React, { useEffect } from "react";
import { BaseMenu, CategoryBox } from "./partials";
import { useAppDispatch, useAppSelector } from "store";
import { thunkFetMainCategories, thunkFetchMenu } from "store/common/menu/menuAsyncThunk";
import { useLocation } from "react-router";
import { Typography } from "antd";
import {
  HomeOutlined,
} from "@ant-design/icons"

const { Text } = Typography;

const MenuPage: React.FC = () => {
  const location = useLocation();
  useHelmet({
    title: "Duy Hai - Menu",
  });
  const dispatch = useAppDispatch();
  const {  menu } = useAppSelector((state) => state.common.menu);
  useEffect(() => {
    dispatch(thunkFetchMenu());
    dispatch(thunkFetMainCategories())
  }, []);

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
          ]
        },
        title: "Trang Menu",
      }}
      footerprops={{
        children: COPY_RIGHT,
        className: "text-center",
      }}
      className="bg-inherit h-auto"
    >
       <Row gutter={[32, 32]}>
          <Col xxl={12} span={24}>
            <BaseMenu menu={menu} />
          </Col>
          {/* category */}
          <Col xxl={12} span={24}>
            <CategoryBox />
          </Col>
        </Row>
    </PlainLayout>
  );
};

export default MenuPage;

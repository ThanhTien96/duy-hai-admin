import { Col, Row } from "antd";
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT } from "constants";
import useHelmet from "hooks/useHelmet";
import React, { useEffect } from "react";
import { BaseMenu, CategoryBox } from "./partials";
import { useAppDispatch, useAppSelector } from "store";
import { thunkFetMainCategories, thunkFetchMenu } from "store/common/menu/menuAsyncThunk";

const MenuPage: React.FC = () => {
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
